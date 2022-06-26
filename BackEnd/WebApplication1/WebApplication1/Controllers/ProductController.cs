using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using WebApplication1.Entities;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("product")]
    [EnableCors("_myAllowSpecificOrigins")]

    public class ProductController : Controller 
    {

        private readonly ProductRepository productRepository;
        private readonly IWebHostEnvironment hostEnvironment;
            public ProductController(IWebHostEnvironment hostEnvironment)
        {
            this.productRepository = new ProductRepository();
            this.hostEnvironment = hostEnvironment;
        }


        [HttpGet("detail/{id}")]
        public Product GetProducts(int id)
        {
           Product product = this.productRepository.getProductById(id);
            return product;
        }

        [HttpGet]
           public List<Product> GetProducts()
        {
            List<Product> products = this.productRepository.getAllProducts();
            return products;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async void  PostProduct([FromForm] ProductCreationDTO product)
        {

            product.imageName = await SaveImage(product.image);

            this.productRepository.insertProduct(product);
        }  

        [HttpPut("{id}"), DisableRequestSizeLimit] 
        public async void PutProducts(int id, [FromForm]  ProductUpdatedDTO product)
        {
            product.imageName = await SaveImage(product.image);
            this.productRepository.updateProduct(id,product);

        } 

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {

            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(hostEnvironment.ContentRootPath, "wwwroot", "Images", imageName);


                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream); 

                }
                return imageName;


        }

        [HttpDelete("{id}")]
        public void DeleteProducts(int id)
        {
            this.productRepository.deleteProduct(id);

        }



    }
}
