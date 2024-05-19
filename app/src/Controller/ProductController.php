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
        $response = [];

        foreach ($products as $product) {
            $response[] = $this->responseBuilder($product);
        }

        return new JsonResponse($response);
    }

    #[Route('/api/products/{id}', methods: ['GET'])]
    public function getAllProducts(Request $request, int $id): JsonResponse
    {
        $product = $this->entityManager->getRepository(Product::class)->findOneBy(["id" => $id]);

        if (!$product) {
            return new JsonResponse(["error" => "Product not found"], 404);
        }

        return new JsonResponse($this->responseBuilder($product));
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
                $product->addSize($this->checkSize($size));
            }
            $product->setGender($this->checkGender($data["gender"]));
            $product->setColor($this->checkColor($data["color"]));
            $product->setBrand($this->checkBrand($data["brand"]));
        } catch (\Exception $e) {
            return new JsonResponse(["error" => $e->getMessage()], $e->getCode() ?? 500);
        }
        isset($data["description"]) ? $product->setDescription($data["description"]) : null;

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return new JsonResponse($this->responseBuilder($product), 201);
    }

    #[Route('/api/products/{id}', methods: ['PUT'])]
    public function updateProduct(Request $request, int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $data = json_decode($request->getContent(), true);
        $product = $this->entityManager->getRepository(Product::class)->findOneBy(['id' => $id]);

        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        if (!isset($data["name"]) && !isset($data["photo"]) && !isset($data["price"]) && !isset($data["type"]) && !isset($data["size"]) && count($data["size"]) == 0 && !isset($data["gender"]) && !isset($data["color"]) && !isset($data["brand"])) {
            return new JsonResponse(["error" => "Missing fields. Mandatory fields: name, photo, price, type, size, gender, color, brand"], 400);
        }

        $product = new Product();
        isset($data["name"]) ? $product->setName($data["name"]) : null;
        isset($data["price"]) ? $product->setPrice($data["price"]) : null;
        isset($data["photo"]) ? $product->setPhoto($data["photo"]) : null;
        try {
            isset($data["type"]) ? $product->setType($this->checkType($data["type"])) : null;
            if (isset($data["size"])) {
                foreach ($data["size"] as $size) {
                    $product->addSize($this->checkSize($size));
                }
            }
            isset($data["gender"]) ? $product->setGender($this->checkGender($data["gender"])) : null;
            isset($data["color"]) ? $product->setColor($this->checkColor($data["color"])) : null;
            isset($data["brand"]) ? $product->setBrand($this->checkBrand($data["brand"])) : null;
        } catch (\Exception $e) {
            return new JsonResponse(["error" => $e->getMessage()], $e->getCode() ?? 500);
        }
        isset($data["description"]) ? $product->setDescription($data["description"]) : null;

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return new JsonResponse($this->responseBuilder($product), 200);
    }

    #[Route('/api/products/{id}', methods: ['DELETE'])]
    public function deleteProduct(Request $request, int $id): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $product = $this->entityManager->getRepository(Product::class)->findOneBy(['id' => $id]);

        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Product deleted successfully']);
    }

    private function checkType(string $type): Type
    {
        $availabletypes = $this->entityManager->getRepository(Type::class)->findAll();

        foreach ($availabletypes as $availabletype) {
            if ($availabletype->getType() === $type) {
                return $availabletype;
            }
        }

        throw new EntityNotFoundException($type . ' is not a valid Type', 401);
    }

    private function checkSize(string $size): Size
    {
        $availableSizes = $this->entityManager->getRepository(Size::class)->findAll();

        foreach ($availableSizes as $availableSize) {
            if ($availableSize->getSize() === $size) {
                return $availableSize;
            }
        }

        throw new EntityNotFoundException($size . ' is not a valid Size', 401);
    }

    private function checkGender(string $gender): Gender
    {
        $availableGenders = $this->entityManager->getRepository(Gender::class)->findAll();

        foreach ($availableGenders as $availableGender) {
            if ($availableGender->getGender() === $gender) {
                return $availableGender;
            }
        }

        throw new EntityNotFoundException($gender . ' is not a valid Gender', 401);
    }

    private function checkColor(string $color): Color
    {
        $availableColors = $this->entityManager->getRepository(Color::class)->findAll();

        foreach ($availableColors as $availableColor) {
            if ($availableColor->getColor() === $color) {
                return $availableColor;
            }
        }

        throw new EntityNotFoundException($color . ' is not a valid Color', 401);
    }

    private function checkBrand(string $brand): Brand
    {
        $availableBrands = $this->entityManager->getRepository(Brand::class)->findAll();

        foreach ($availableBrands as $availableBrand) {
            if ($availableBrand->getName() === $brand) {
                return $availableBrand;
            }
        }

        throw new EntityNotFoundException($brand . ' is not a valid Brand', 401);
    }

    private function responseBuilder(Product $product): array
    {
        $response = [
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

        $sizes = $product->getSize();
        foreach ($sizes as $size) {
            $response["size"][] = $size->getSize();
        }

        return $response;
    }
}
