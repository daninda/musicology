using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.DTOs;

public class AddProductDto
{
    [Required]
    [StringLength(64, MinimumLength = 2)]
    public string Name { get; set; } = null!;

    [Required] public ProductCategory Category { get; set; }

    [Range(0.01, double.MaxValue)] public decimal Price { get; set; }

    [Required]
    [StringLength(512, MinimumLength = 20)]
    public string Description { get; set; } = null!;
}