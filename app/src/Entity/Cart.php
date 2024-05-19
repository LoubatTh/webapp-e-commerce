<?php

namespace App\Entity;

use App\Repository\CartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartRepository::class)]
class Cart
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $price = null;

    #[ORM\OneToOne(mappedBy: 'cart', cascade: ['persist', 'remove'])]
    private ?User $customer = null;

    /**
     * @var Collection<int, CartProduct>
     */
    #[ORM\OneToMany(targetEntity: CartProduct::class, mappedBy: 'cart', orphanRemoval: true)]
    private Collection $Products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->Products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getCustomer(): ?User
    {
        return $this->customer;
    }

    public function setCustomer(?User $customer): static
    {
        // unset the owning side of the relation if necessary
        if ($customer === null && $this->customer !== null) {
            $this->customer->setCart(null);
        }

        // set the owning side of the relation if necessary
        if ($customer !== null && $customer->getCart() !== $this) {
            $customer->setCart($this);
        }

        $this->customer = $customer;

        return $this;
    }

    /**
     * @return Collection<int, CartProduct>
     */
    public function getProducts(): Collection
    {
        return $this->Products;
    }

    public function addProduct(CartProduct $product): static
    {
        if (!$this->Products->contains($product)) {
            $this->Products->add($product);
            $product->setCart($this);
        }

        return $this;
    }

    public function removeProduct(CartProduct $product): static
    {
        if ($this->Products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCart() === $this) {
                $product->setCart(null);
            }
        }

        return $this;
    }
}