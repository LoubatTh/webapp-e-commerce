<?php

namespace App\Controller;

use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class OrderController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/orders', methods: ['GET'])]
    public function getOrders(): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $response = [];

        foreach ($this->getUser()->getOrders() as $order) {
            $address = $order->getAddress();

            $response[] = [
                "id" => $order->getId(),
                "createdAt" => $order->getCreatedAt(),
                "userId" => $order->getCustomer()->getId(),
                "price" => $order->getPrice(),
                "address" => [
                    "id" => $address->getId(),
                    "name" => $address->getName(),
                    "country" => $address->getCountry(),
                    "postalCode" => $address->getPostalCode(),
                    "city" => $address->getCity(),
                    "address" => $address->getAddress(),
                    "additionnalAddress" => $address->getAdditionnalAddress(),
                ],
            ];
        }

        return new JsonResponse($response);
    }


    #[Route('/api/orders/{id}', methods: ['GET'])]
    public function getOrder(int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $order = $this->entityManager->getRepository(Order::class)->findOneBy(["id" => $id]);

        if (!$order) {
            return new JsonResponse(["error" => "Order not found"], 404);
        }

        if ($order->getCustomer() !== $this->getUser()) {
            return new JsonResponse((["error" => "Not your order"]), 401);
        }

        $address = $order->getAddress();

        $response[] = [
            "id" => $order->getId(),
            "createdAt" => $order->getCreatedAt(),
            "userId" => $order->getCustomer()->getId(),
            "price" => $order->getPrice(),
            "address" => [
                "id" => $address->getId(),
                "name" => $address->getName(),
                "country" => $address->getCountry(),
                "postalCode" => $address->getPostalCode(),
                "city" => $address->getCity(),
                "address" => $address->getAddress(),
                "additionnalAddress" => $address->getAdditionnalAddress(),
            ],
        ];

        return new JsonResponse($response);
    }
}
