<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\Order;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class CartController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/carts', methods: ['GET'])]
    public function getCart(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $cart = $this->getUser()->getCart();
        $response = [
            "id" => $cart->getId(),
            "price" => $cart->getPrice(),
            "products" => [],
        ];
        $products = $cart->getProducts();

        foreach ($products as $product) {
            $response["products"][] = [
                "id" => $product->getId(),
                "name" => $product->getName(),
                "photo" => $product->getPhoto(),
                "price" => $product->getPrice(),
                "type" => $product->getType()->getType(),
                "gender" => $product->getGender()->getGender(),
                "color" => $product->getColor()->getColor(),
                "brand" => $product->getBrand()->getName(),
                "description" => $product->getDescription(),
            ];
        }

        return new JsonResponse($response, 200);
    }

    #[Route("/api/carts/validate", methods: ["POST"])]
    public function validateCart(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $data = json_decode($request->getContent(), true);
        $cart = $this->getUser()->getCart();

        if (!isset($data["address"])) {
            return new JsonResponse(["error" => "Adress is required"], 401);
        }

        $address = $this->entityManager->getRepository(Address::class)->findOneBy(["id" => $data["address"]]);

        if (!$address) {
            return new JsonResponse(["error" => "Adress not found"]);
        }

        if ($address->getCustomer() != $this->getUser()) {
            return new JsonResponse(["error" => "This is not associated to this user"], 401);
        }

        $stripeSecret = $_ENV["STRIPE_SECRET_KEY"];
        $domain = $_ENV["DOMAIN"];

        \Stripe\Stripe::setApiKey($stripeSecret);
        header('Content-Type: application/json');

        $checkout_session = \Stripe\Checkout\Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => ['name' => 'Cart'],
                        'unit_amount' => $cart->getPrice() * 100,
                    ],
                    'quantity' => 1,
                ]
            ],
            'mode' => 'payment',
            // TODO: Adjust payment url redirect
            'success_url' => $domain . "/",
            'cancel_url' => $domain . "/",
        ]);

        if($checkout_session->payment_status == "paid") {
            $order = new Order();
            $order->setCustomer($this->getUser());
            $order->setAddress($address);
            $order->setPrice($cart->getPrice());
            foreach ($cart->getProducts() as $product) {
                $order->addProduct($product);
            }
            $order->setCreatedAt(new \DateTime());
            $this->entityManager->persist($order);
            
            $this->clearCart();
            $this->entityManager->flush();
        }

        return new RedirectResponse($checkout_session->url, 200);
    }

    #[Route("/api/carts/{id}", methods: ["POST"])]
    public function addProductToCart(Request $request, int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $cart = $this->getUser()->getCart();
        $product = $this->entityManager->getRepository(Product::class)->findOneBy(['id' => $id]);

        if (!$product) {
            return new JsonResponse(["error" => "Product not found"], 404);
        }

        $cart->addProduct($product);
        $cart->setPrice($cart->getPrice() + $product->getPrice());
        $this->entityManager->flush();

        return new JsonResponse(["message" => "Product added to Cart"], 200);
    }

    #[Route("/api/carts/{id}", methods: ["DELETE"])]
    public function removeProductFromCart(Request $request, int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $cart = $this->getUser()->getCart();
        $product = $this->entityManager->getRepository(Product::class)->findOneBy(['id' => $id]);

        if (!$product) {
            return new JsonResponse(["error" => "Product not found"], 404);
        }

        $cart->removeProduct($product);
        $cart->setPrice($cart->getPrice() - $product->getPrice());
        $this->entityManager->flush();

        return new JsonResponse(["message" => "Product removed from Cart"], 200);
    }


    private function clearCart()
    {
        $cart = $this->getUser()->getCart();
        $cart->setPrice(0);
        foreach ($cart->getProducts() as $product) {
            $cart->removeProduct($product);
        }

        $this->entityManager->flush();
    }
}
