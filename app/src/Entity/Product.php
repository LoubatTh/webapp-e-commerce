<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

enum Brand: string
{
    case Nike = 'Nike';
    case Adidas = 'Adidas';
    case Lacoste = 'Lacoste';
    case UnderArmor = 'UnderArmor';
    case CalvinKlein = 'CalvinKlein';
    case Champion = 'Champion';
    case TheNorthFace = 'TheNorthFace';
}

enum Color: string
{
    case White = 'white';
    case Black = 'Black';
    case Yellow = 'Yellow';
    case Red = 'Red';
    case Blue = 'Blue';
    case Green = 'white';
}

enum Gender: string
{
    case Men = 'Men';
    case Women = 'Women';
    case Kid = 'Kid';
}

enum Size: string
{
    case XS = 'XS';
    case S = 'S';
    case M = 'M';
    case L = 'L';
    case XL = 'XL';
}

enum Type: string
{
    case Shirt = 'shirt';
    case Sweat = 'Sweat';
    case Short = 'Short';
    case Pants = 'Pants';
}

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $photo = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column(length: 255, enumType: Type::class)]
    private ?string $type = null;

    #[ORM\Column(length: 255, enumType: Size::class)]
    private ?string $size = null;

    #[ORM\Column(type: Types::ARRAY )]
    private array $matter = [];

    #[ORM\Column(length: 255, enumType: Gender::class)]
    private ?string $gender = null;

    #[ORM\Column(length: 255, enumType: Color::class)]
    private ?string $color = null;

    #[ORM\Column(length: 255, enumType: Brand::class)]
    private ?string $brand = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): static
    {
        $this->photo = $photo;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function setType(Type $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getSize(): ?Size
    {
        return $this->size;
    }

    public function setSize(Size $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getMatter(): array
    {
        return $this->matter;
    }

    public function setMatter(array $matter): static
    {
        $this->matter = $matter;

        return $this;
    }

    public function getGender(): ?Gender
    {
        return $this->gender;
    }

    public function setGender(Gender $gender): static
    {
        $this->gender = $gender;

        return $this;
    }

    public function getColor(): ?Color
    {
        return $this->color;
    }

    public function setColor(Color $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(Brand $brand): static
    {
        $this->brand = $brand;

        return $this;
    }
}
