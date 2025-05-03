using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Models;

namespace server.Services;

public class ReviewService
{
    private readonly AppDbContext _context;

    public ReviewService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Review>> GetByProductAsync(int productId)
    {
        return await _context.Reviews
            .Where(r => r.ProductId == productId)
            .ToListAsync();
    }

    public async Task<Review?> AddAsync(AddReviewDto dto)
    {
        var productExists = await _context.Products.AnyAsync(p => p.Id == dto.ProductId);
        if (!productExists)
            return null;

        var review = new Review
        {
            AuthorName = dto.AuthorName,
            Text = dto.Text,
            ProductId = dto.ProductId
        };

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        return review;
    }
}