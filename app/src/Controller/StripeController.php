<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Stripe\Event;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{
    private $entityManager;
    private $logger;

    public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
        $this->logger = $logger;
    }

    #[Route('/api/webhook/stripe', name: 'stripe_webhook')]
    public function stripeWebhook(Request $request): Response
    {
        $payload = @file_get_contents('php://input');
        $this->logger->info('Stripe Webhook received');

        try {
            $event = Event::constructFrom(json_decode($payload, true));
            $this->logger->info($event);
        } catch (\UnexpectedValueException $e) {
            echo '⚠️  Webhook error while parsing basic request.';
            http_response_code(400);
            exit();
        }

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $this->handleCheckoutSession($session);
                break;
            default:
                return new Response('Unhandled event type', Response::HTTP_OK);
        }

        return new Response('Success', Response::HTTP_OK);
    }

    private function handleCheckoutSession($session)
    {
        $orderId = $session->client_reference_id;
        $order = $this->entityManager->getRepository(Order::class)->findOneBy(['id' => $orderId]);

        if ($order) {
            $order->setPaid(true);
            $customer = $this->entityManager->getRepository(User::class)->findOneBy(['id' => $order->getCustomer()->getId()]);
            $cart = $customer->getCart();
            $cart->setPrice(0);
            foreach ($cart->getProducts() as $product) {
                $cart->removeProduct($product);
            }

            $this->entityManager->flush();
        }
    }
}
