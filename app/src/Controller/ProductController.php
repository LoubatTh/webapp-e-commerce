<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Brand;
use App\Entity\Color;
use App\Entity\Gender;
use App\Entity\Size;
use App\Entity\Type;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ProductController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/products', methods: ['GET'])]
    public function getProducts(Request $request): JsonResponse
    {
        $products = $this->entityManager->getRepository(Product::class)->findAll();

        return new JsonResponse($products);
    }

    #[Route('/api/products/{id}', methods: ['GET'])]
    public function getAllProducts(Request $request, int $id): JsonResponse
    {

        $products = $this->entityManager->getRepository(Product::class)->findBy(["id" => $id]);

        if (count($products) === 0) {
            return new JsonResponse(["error" => "Product not found"], 404);
        }

        return new JsonResponse($products);
    }

    #[Route('/api/products', methods: ['POST'])]
    public function addProduct(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $data = json_decode($request->getContent(), true);

        if (!isset($data["name"]) || !isset($data["photo"]) || !isset($data["price"]) || !isset($data["type"]) || !isset($data["size"]) || count($data["size"]) == 0 || !isset($data["gender"]) || !isset($data["color"]) || !isset($data["brand"])) {
            return new JsonResponse(["error" => "Missing fields. Mandatory fields: name, phot, price, type, size, gender, color, brand"], 400);
        }

        $product = new Product();
        $product->setName($data["name"]);
        $product->setPrice($data["price"]);
        $product->setPhoto($data["photo"]);
        try {
            $product->setType($this->checkType($data["type"]));
            foreach ($data["size"] as $size) {
                $product->addSize($size);
            }
            $product->setGender($data["gender"]);
            $product->setColor($data["color"]);
        } catch (\Exception $e) {
            return new JsonResponse(["error" => $e->getMessage()], $e->getCode() ?? 500);
        }
        isset($data["description"]) ? $product->setDescription($data["description"]) : null;

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        $response = [
            "name" => $product->getName(),
            "photo" => $product->getPhoto(),
            "price" => $product->getPrice(),
            "type" => $product->getType(),
            "size" => $product->getSize(),
            "gender" => $product->getGender(),
            "color" => $product->getColor(),
            "description" => $product->getDescription(),
        ];

        return new JsonResponse($response, 201);
    }

    #[Route('/api/products/{id}', methods: ['PUT'])]
    public function updateProduct(): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        return new JsonResponse(['error' => 'Not implemented'], 501);
    }

    #[Route('/api/products/{id}', methods: ['DELETE'])]
    public function deleteProduct(): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        return new JsonResponse(['error' => 'Not implemented'], 501);
    }

    private function checkType(string $type): Type
    {
        $availabletypes = $this->entityManager->getRepository(Type::class)->findAll();

        $key = array_search($type, $availabletypes);

        if (!$key) {
            throw new EntityNotFoundException($type . ' is not a valid Type', 401);
        }

        return $availabletypes[$key];
    }
}
