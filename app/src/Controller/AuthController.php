<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, JWTTokenManagerInterface $JWTManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['username']) || !isset($data['password'])) {
            return new JsonResponse([
                "error" => "Missing username or password to register user.",
            ], 400);
        }

        if ($entityManager->getRepository(User::class)->findOneBy(['username' => $data['username']])) {
            return new JsonResponse([
                "error" => "Username already taken."
            ], 400);
        }

        $user = new User();
        $user->setUsername($data['username']);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        $user->setRoles(["ROLE_USER"]);

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['token' => $JWTManager->create($user)], 201);
    }
}
