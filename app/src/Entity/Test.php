<?php

namespace App\Entity;

use App\Repository\TestRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: TestRepository::class)]
#[ApiResource(
        operations: [
            new Get(normalizationContext: ['groups' => 'conference:item']),
            new GetCollection(normalizationContext: ['groups' => 'conference:list'])
        ],
        order: ['year' => 'DESC', 'city' => 'ASC'],
        paginationEnabled: false,
    )]
class Test
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['conference:item', 'conference:list'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['conference:item', 'conference:list'])]
    private ?string $test = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTest(): ?string
    {
        return $this->test;
    }

    public function setTest(string $test): static
    {
        $this->test = $test;

        return $this;
    }
}
