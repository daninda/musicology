using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/reviews")]
public class ReviewController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReviewController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{productId}")]
    public async Task<IActionResult> GetByProduct(int productId)
    {
        var reviews = await _context.Reviews
            .Where(r => r.ProductId == productId)
            .ToListAsync();

        return Ok(reviews);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] AddReviewDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var productExists = await _context.Products.AnyAsync(p => p.Id == dto.ProductId);
        if (!productExists) return NotFound("Товар не найден");

        var review = new Review
        {
            AuthorName = dto.AuthorName,
            Text = dto.Text,
            ProductId = dto.ProductId
        };

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        return Ok(review);
    }
}