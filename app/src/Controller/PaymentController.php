<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Stripe;

class PaymentController extends AbstractController
{
  private $entityManager;


  public function __construct(EntityManagerInterface $entityManager)
  {
    $this->entityManager = $entityManager;
  }

  #[Route('/api/stripe/checkout', methods: ['GET'])]
  public function stripeCheckout(Request $request): RedirectResponse
  {
    $stripeSecret = $_ENV["STRIPE_SECRET_KEY"];
    $domain = $_ENV["DOMAIN"];

    \Stripe\Stripe::setApiKey($stripeSecret);
    header('Content-Type: application/json');

    $checkout_session = \Stripe\Checkout\Session::create([
      'line_items' => [
        [
          # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
          'price_data' => [
            'currency' => 'eur',
            'product_data' => ['name' => 'panier'],
            'unit_amount' => 50,
          ],
          'quantity' => 1,
        ]
      ],
      'mode' => 'payment',
      // TODO: Adjust payment url redirect
      'success_url' => $domain . "/",
      'cancel_url' => $domain . "/",
    ]);

    return new RedirectResponse($checkout_session->url, 303);
  }
}