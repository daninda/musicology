using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/reviews")]
public class ReviewController : ControllerBase
{
    private readonly ReviewService _reviewService;

    public ReviewController(ReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [HttpGet("{productId}")]
    public async Task<IActionResult> GetByProduct(int productId)
    {
        var reviews = await _reviewService.GetByProductAsync(productId);
        return Ok(reviews);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] AddReviewDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _reviewService.AddAsync(dto);

        if (result == null)
            return NotFound("Товар не найден");

        return Ok(result);
    }
}