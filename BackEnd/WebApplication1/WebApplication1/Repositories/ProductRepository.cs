using MySql.Data.MySqlClient;
using WebApplication1.Entities;

namespace WebApplication1.Repositories
{
    public class ProductRepository
    {
        MySqlConnection Conexao;

        public ProductRepository()
        {
            try
            {
                string credentials = "datasource=localhost;username=root;password=;database=crudproduct";
                Conexao = new MySqlConnection(credentials);
            }catch(Exception err)
            {
                Console.WriteLine(err.Message);
            }
        }


        public void insertProduct(ProductCreationDTO product)
        {
            try
            {
                 string sql = " INSERT INTO product (name,image,description,quantity,status,price) VALUES ('" + product.name + "','" + product.imageName + "','" + product.description + "'," + product.quantity + "," + product.status + "," + product.price + ")";
                            MySqlCommand comand = new MySqlCommand(sql, this.Conexao);
                this.Conexao.Open();
                comand.ExecuteReader();
            }
            finally
            {
                this.Conexao.Close();
            }

        }
        public Product getProductById(int idRequest) {
            try
            {
                string sql = " SELECT * from product WHERE id = " + idRequest;

                MySqlCommand comand = new MySqlCommand(sql, this.Conexao);
                this.Conexao.Open();
                MySqlDataReader reader = comand.ExecuteReader();

                if (reader.Read())
                {
                    int id = int.Parse(reader["id"].ToString());
                    decimal price = decimal.Parse(reader["price"].ToString());
                    int quantity = int.Parse(reader["quantity"].ToString());
                    bool status = bool.Parse(reader["status"].ToString());
                    string image = reader["image"].ToString();
                    string description = reader["description"].ToString();
                    string name = reader["name"].ToString();
                    Product product = new Product(id, name, image, description, quantity, status, price);


                    return product;
                }
                return new Product(0,null,null,null,0,false,0);
  
            }
            finally
            {
                this.Conexao.Close();
            }
        }

        public List<Product> getAllProducts()
        {
            try
            {
                string sql = " SELECT * from product";

                MySqlCommand comand = new MySqlCommand(sql, this.Conexao);
                this.Conexao.Open();
                MySqlDataReader reader = comand.ExecuteReader();
                List<Product> products = new List<Product>();
                
                while (reader.Read())
                {
                    int id = int.Parse(reader["id"].ToString());
                    decimal price = decimal.Parse(reader["price"].ToString());
                    int quantity = int.Parse(reader["quantity"].ToString());
                    bool status = bool.Parse(reader["status"].ToString());
                    string image = reader["image"].ToString();
                    string description = reader["description"].ToString();
                    string name = reader["name"].ToString();
                    Product product = new Product(id,name,image,description,quantity,status,price);
                    products.Add(product);

                }
                return products;
            }
            finally
            {
                this.Conexao.Close();
            }

        }


        public void updateProduct(int id, ProductUpdatedDTO product)
        {
            try
            {
                string sql = " UPDATE product SET " +
                    " name = '" +  product.name + "', image = '" + product.imageName + "',description = '" + product.description + "',quantity = " + product.quantity + ",status = " + product.status + ",price = " + product.price +
                    " WHERE id = " + id;
                MySqlCommand comand = new MySqlCommand(sql, this.Conexao);
                this.Conexao.Open();

                 comand.ExecuteReader();

            }
            finally
            {
                this.Conexao.Close();
            }

        }



        public void deleteProduct(int id)
        {
            try
            {
                string sql = " DELETE from product  " +
                    " WHERE id = " + id;

                MySqlCommand comand = new MySqlCommand(sql, this.Conexao);
                this.Conexao.Open();
                comand.ExecuteNonQuery();
            }
            finally
            {
                this.Conexao.Close();
            }

        }
    }
}
