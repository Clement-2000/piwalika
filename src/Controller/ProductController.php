<?php

namespace App\Controller;

use App\Entity\Product;
use App\Form\ProductType;
use App\Repository\ProductRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends AbstractController
{
    private ManagerRegistry $manager_regitstry;
    private ProductRepository $product_repository;

    public function __construct(ManagerRegistry $manager_regitstry)
    {
        $this->manager_regitstry = $manager_regitstry;
        $this->product_repository = $manager_regitstry->getRepository(Product::class);
    }

    public function list(): Response
    {
        return $this->render("product.list.html.twig", [
            "section" => "products"
        ]);
    }

    public function show(): Response
    {
        return $this->render("product.show.html.twig", [
            "section" => "products"
        ]);
    }


    public function adminList(): Response
    {   
        $products = $this->product_repository->findAll();

        return $this->render("admin.product.list.html.twig", [
            "section" => "products",
            "products" => $products
        ]);
    }

    public function adminAdd(Request $request): Response
    {
        $product = new Product();
        
        $form = $this->createForm(ProductType::class, $product);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $product = $form->getData();

            $this->product_repository->save($product, true);

            return $this->redirectToRoute('admin.product.list');
        }

        return $this->render("admin.product.add.html.twig", [
            "section" => "products",
            "form" => $form->createView()
        ]);
    }

    public function adminEdit(Request $request, int $id): Response
    {
        $product = $this->product_repository->find($id);
        
        $form = $this->createForm(ProductType::class, $product);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $product = $form->getData();

            $this->product_repository->save($product, true);

            return $this->redirectToRoute('admin.product.list');
        }

        return $this->render("admin.product.edit.html.twig", [
            "section" => "products",
            "form" => $form->createView()
        ]);
    }

    public function adminDelete(int $id): Response
    {   
        $product = $this->product_repository->find($id);

        $this->product_repository->remove($product, true);
        
        return $this->redirectToRoute('admin.product.list');
    }
}
