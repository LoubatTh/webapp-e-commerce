<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Gender;
use App\Entity\Size;
use App\Entity\Type;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $brands = array("Nike", "Adidas", "Lacoste", "Under Armor", "Calvin Klein", "Champion", "The North Face");
        $this->createBrands($manager, $brands);

        $genders = array("Men", "Women", "Kid");
        $this->createGenders($manager, $genders);

        $size = array("XS", "S", "M", "L", "XL", "XXL", "XXXL", "∞L");
        $this->createSize($manager, $size);

        $type = array("Shirt", "Sweat", "Short", "Pants", "Shoes");
        $this->createType($manager, $type);

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
}
