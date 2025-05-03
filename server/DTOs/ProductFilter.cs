using server.Models;

namespace server.DTOs;

public class ProductFilter
{
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public ProductCategory? Category { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 6;
}