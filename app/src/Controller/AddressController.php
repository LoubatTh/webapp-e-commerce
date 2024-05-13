<?php

namespace App\Controller;

use App\Entity\Address;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class AddressController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/user/address', methods: ['POST'])]
    public function addAddress(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        if (!isset($data['postalCode']) || !isset($data['country']) || !isset($data['city']) || !isset($data['address']) || !isset($data['name'])) {
            return new JsonResponse([
                "error" => "Incomplete adress, the following fields are mandatory: postalCode, country, city, address, name"
            ], 400);
        }

        $address = new Address();
        $address->setPostalCode($data['postalCode']);
        $address->setCountry($data['country']);
        $address->setCity($data['city']);
        $address->setAddress($data['address']);
        $address->setName($data['name']);
        isset($data['additionnalAddress']) ? $address->setAdditionnalAddress($data['additionnalAddress']) : null;

        $this->entityManager->persist($address);
        $user->addAddress($address);
        $this->entityManager->flush();

        return new JsonResponse(["message" => "Address added successfully"], 201);
    }

    #[Route('/api/user/address/{id}', methods: ['PUT'])]
    public function updateAddress(Request $request, int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->getUser();
        $address = $this->entityManager->getRepository(Address::class)->findOneBy(['id' => $id]);
        $data = json_decode($request->getContent(), true);

        if ($address == null) {
            return new JsonResponse(["error" => "Adress not found"], 404);
        }

        if ($address->getCustomer()->getId() !== $user->getId()) {
            return new JsonResponse(["error" => "You are not allowed to edit this address"], 401);
        }

        if (!isset($data['postalCode']) && !isset($data['country']) && !isset($data['city']) && !isset($data['address']) && !isset($data['name']) && !isset($data['additionnalAddress'])) {
            return new JsonResponse([
                "error" => "Missing field, you need to update at least one of the following fields: postalCode, country, city, address, name, additionnalAddress"
            ], 400);
        }

        isset($data["country"]) ? $address->setCountry($data["country"]) : null;
        isset($data["city"]) ? $address->setCity($data["city"]) : null;
        isset($data["address"]) ? $address->setAddress($data["address"]) : null;
        isset($data["postalCode"]) ? $address->setPostalCode($data["postalCode"]) : null;
        isset($data["name"]) ? $address->setName($data["name"]) : null;
        isset($data["additionnalAddress"]) ? $address->setAdditionnalAddress($data["additionnalAddress"]) : null;

        $this->entityManager->persist(($address));
        $this->entityManager->flush();

        $response = [
            "id" => $address->getId(),
            "postalCode" => $address->getPostalCode(),
            "country" => $address->getCountry(),
            "city" => $address->getCity(),
            "address" => $address->getAddress(),
            "name" => $address->getName(),
            "additionnalAddress" => $address->getAdditionnalAddress(),
        ];

        return new JsonResponse($response);
    }

    #[Route('/api/user/address/{id}', methods: ['DELETE'])]
    public function deleteAddress(Request $request, int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->getUser();
        $address = $this->entityManager->getRepository(Address::class)->findOneBy(['id' => $id]);

        if ($address == null) {
            return new JsonResponse(["error" => "Adress not found"], 404);
        }

        if ($address->getCustomer()->getId() !== $user->getId()) {
            return new JsonResponse(["error" => "You are not allowed to delete this address"], 401);
        }

        $this->entityManager->remove($address);
        $this->entityManager->flush();

        return new JsonResponse(["message" => "Adress deleted successfully"]);
    }
}
