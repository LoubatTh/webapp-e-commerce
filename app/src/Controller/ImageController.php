<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Routing\Attribute\Route;

class ImageController extends AbstractController
{
  private $entityManager;

  public function __construct(EntityManagerInterface $entityManager)
  {
    $this->entityManager = $entityManager;
  }

  #[Route('/api/image', methods: ['POST'])]
  public function uploadImage(Request $request): JsonResponse
  {
    $data = json_decode($request->getContent(), true);

    if (!isset($data["filename"]) || !isset($data["data"])) {
      return new JsonResponse(["error" => "Incomplete image", 400]);
    }

    $decodedData = base64_decode($data["data"]);
    $extension = explode(".", $data["filename"])[sizeof(explode(".", $data["filename"])) - 1];
    $filename = uniqid("product_") . "." . $extension;
    $imgPath = $this->getParameter("kernel.project_dir") . "/public/uploads/" . $filename;

    file_put_contents($imgPath, $decodedData);
    $uploadedFile = new File($imgPath);
    dd($uploadedFile);

    return new JsonResponse(["error" => "Not implemented"], 501);
  }
}