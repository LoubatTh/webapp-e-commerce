<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/api/user', methods: ['GET'])]
    public function getCurrentUser(): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $user = $this->getUser();

        if (!$user instanceof User) {
            return new JsonResponse(["error" => "User not found"], 404);
        }

        $response = [
            "id" => $user->getId(),
            "username" => $user->getUsername(),
            "roles" => $user->getRoles(),
            "email" => $user->getEmail(),
            "firstname" => $user->getFirstname(),
            "lastname" => $user->getLastname(),
            "address" => $user->getAddress(),
        ];

        return new JsonResponse($response);
    }


    #[Route('/api/user', methods: ['PUT'])]
    public function updateCurrentUser(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        if (!$user instanceof User) {
            return new JsonResponse(["error" => "User not found"], 404);
        }

        if (!isset($data['email']) && !isset($data['firstname']) && !isset($data['lastname'])) {
            return new JsonResponse([
                "error" => "Missing field. You need to input at least one field. Possible fields: email, firstname, lastname",
            ], 400);
        }

        if ($entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']])) {
            return new JsonResponse([
                "error" => "Email already used."
            ], 400);
        }
        $data["email"] ? $user->setEmail($data["email"]) : null;
        $data["firstname"] ? $user->setFirstname($data["firstname"]) : null;
        $data["lastname"] ? $user->setLastname($data["lastname"]) : null;
        $data["address"] ? $user->setAddress($data["address"]) : null;
        $entityManager->persist($user);

        $response = [
            "id" => $user->getId(),
            "username" => $user->getUsername(),
            "roles" => $user->getRoles(),
            "email" => $user->getEmail(),
            "firstname" => $user->getFirstname(),
            "lastname" => $user->getLastname(),
            "address" => $user->getAddress(),
        ];

        return new JsonResponse($response);
    }

    private function checkEmail(User $user, string $email, EntityManagerInterface $entityManager): bool
    {
        if ($user->getEmail() !== $email) {
            return true;
        }

        if ($entityManager->getRepository(User::class)->findOneBy(['email' => $email])) {
            return false;
        }

        return true;
    }
}
