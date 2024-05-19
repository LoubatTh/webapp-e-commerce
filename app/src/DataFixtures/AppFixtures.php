<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Brand;
use App\Entity\Gender;
use App\Entity\Size;
use App\Entity\Type;
use App\Entity\Color;
use App\Entity\Cart;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Create Brands, Genders, Sizes, Types, Colors
        $brands = ["Nike", "Adidas", "Lacoste", "Under Armor", "Calvin Klein", "Champion", "The North Face", "Epikek"];
        foreach ($brands as $brandName) {
            $brand = new Brand();
            $brand->setName($brandName);
            $manager->persist($brand);
        }

        $genders = ["Men", "Women", "Kid", "Unisex"];
        foreach ($genders as $genderName) {
            $gender = new Gender();
            $gender->setGender($genderName);
            $manager->persist($gender);
        }

        $sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "∞L"];
        foreach ($sizes as $sizeName) {
            $size = new Size();
            $size->setSize($sizeName);
            $manager->persist($size);
        }

        $types = ["Shirt", "Sweat", "Short", "Pants", "Shoes"];
        foreach ($types as $typeName) {
            $type = new Type();
            $type->setType($typeName);
            $manager->persist($type);
        }

        $colors = ["Black", "Grey", "White", "Blue", "Yellow", "Orange", "Cyan", "Green", "Red"];
        foreach ($colors as $colorName) {
            $color = new Color();
            $color->setColor($colorName);
            $manager->persist($color);
        }

        $cart = new Cart();
        $cart->setPrice(0);

        // Create an admin user
        $admin = new User();
        $admin->setCart($cart);
        $admin->setUsername('admin');
        $admin->setEmail('admin@example.com');
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setFirstname('Admin');
        $admin->setLastname('Admin');

        $admin->setPassword($this->passwordHasher->hashPassword(
            $admin,
            'Admin123'  // Password
        ));
        $manager->persist($admin);

        $manager->flush();
    }
}
