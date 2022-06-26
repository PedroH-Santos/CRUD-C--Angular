


using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Entities
{
    public class Product
    {

        public int id { get; set; }
        [StringLength(150)]

        public string name { get; set; }
        public string image { get; set; }
        [StringLength(2000)]
        public string description { get; set; }
        public int quantity { get; set; }
        public bool status { get; set; }
        public decimal price { get; set; }
        public Product(int id, string name, string image, string description, int quantity, bool status, decimal price)
        {
            this.id = id;
            this.name = name;
            this.image = image;
            this.description = description;
            this.quantity = quantity;
            this.status = status;
            this.price = price;
        }

    }

    public class ProductCreationDTO
    {
        [StringLength(150)]
        public string name { get; set; }
        public IFormFile image { get; set; }
        public string? imageName { get; set; }
        [StringLength(2000)]

        public string description { get; set; }
        public int quantity { get; set; }
        public bool status { get; set; }
        public decimal price { get; set; }

    }

    public class ProductUpdatedDTO
    {
        public int id { get; set; }
        [StringLength(150)]

        public string name { get; set; }
        public IFormFile image { get; set; }

        public string? imageName { get; set; }
        [StringLength(2000)]

        public string description { get; set; }
        public int quantity { get; set; }
        public bool status { get; set; }
        public decimal price { get; set; }

    }

}
