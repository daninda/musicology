using System.ComponentModel.DataAnnotations;

namespace server.DTOs;

public class AddReviewDto
{
    [Required, StringLength(32, MinimumLength = 3)]
    public string AuthorName { get; set; } = null!;

    [Required, StringLength(512, MinimumLength = 10)]
    public string Text { get; set; } = null!;

    [Required]
    public int ProductId { get; set; }
}