using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Models;

namespace server.Services;

public class ProductService
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public ProductService(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    public async Task<PagedResult<Product>> GetProductsAsync(ProductFilter filter)
    {
        var query = _context.Products.AsQueryable();

        if (filter.MinPrice.HasValue)
            query = query.Where(p => p.Price >= filter.MinPrice.Value);

        if (filter.MaxPrice.HasValue)
            query = query.Where(p => p.Price <= filter.MaxPrice.Value);

        if (filter.Category.HasValue)
            query = query.Where(p => p.Category == filter.Category.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();

        return new PagedResult<Product>
        {
            Items = items,
            TotalCount = totalCount
        };
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<Product> AddProductAsync(AddProductDto dto, IFormFile imageFile)
    {
        if (imageFile == null || imageFile.Length == 0)
            throw new ArgumentException("Image is required");

        var imageFolder = Path.Combine(_env.WebRootPath, "images");
        if (!Directory.Exists(imageFolder))
            Directory.CreateDirectory(imageFolder);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
        var filePath = Path.Combine(imageFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(stream);
        }

        var product = new Product
        {
            Name = dto.Name,
            Category = dto.Category,
            Price = dto.Price,
            Description = dto.Description,
            ImagePath = $"/images/{fileName}"
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return product;
    }
}
