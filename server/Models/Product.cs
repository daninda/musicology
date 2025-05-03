namespace server.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ProductCategory Category { get; set; }
    public decimal Price { get; set; }
    public string ImagePath { get; set; } = null!;
    public string Description { get; set; } = null!;
}