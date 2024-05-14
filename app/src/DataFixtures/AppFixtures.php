<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Gender;
use App\Entity\Size;
use App\Entity\Type;
use App\Entity\Color;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $brands = array("Nike", "Adidas", "Lacoste", "Under Armor", "Calvin Klein", "Champion", "The North Face");
        $this->createBrands($manager, $brands);

        $genders = array("Men", "Women", "Kid", "Unisex");
        $this->createGenders($manager, $genders);

        $sizes = array("XS", "S", "M", "L", "XL", "XXL", "XXXL", "∞L");
        $this->createSize($manager, $sizes);

        $types = array("Shirt", "Sweat", "Short", "Pants", "Shoes");
        $this->createType($manager, $types);

        $colors = array("Black", "Grey", "White", "Blue", "Yellow", "Orange", "Cyan", "Green", "Red");
        $this->createColor($manager, $colors);

        $manager->flush();
    }

    private function createBrands(ObjectManager $manager, array $brands): void
    {
        foreach ($brands as $brandName) {
            $brand = new Brand();
            $brand->setName($brandName);
            $manager->persist($brand);
        }
    }

    private function createGenders(ObjectManager $manager, array $genders): void
    {
        foreach ($genders as $genderName) {
            $gender = new Gender();
            $gender->setGender($genderName);
            $manager->persist($gender);
        }
    }

    private function createSize(ObjectManager $manager, array $size): void
    {
        foreach ($size as $sizeName) {
            $size = new Size();
            $size->setSize($sizeName);
            $manager->persist($size);
        }
    }

    private function createType(ObjectManager $manager, array $type): void
    {
        foreach ($type as $typeName) {
            $type = new Type();
            $type->setType($typeName);
            $manager->persist($type);
        }
    }

    private function createColor(ObjectManager $manager, array $colors): void
    {
        foreach ($colors as $colorName) {
            $color = new Color();
            $color->setColor($colorName);
            $manager->persist($color);
        }
    }
}
