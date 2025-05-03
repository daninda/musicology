namespace server.Models;

public class Review
{
    public int Id { get; set; }

    public string AuthorName { get; set; } = null!;

    public string Text { get; set; } = null!;

    public int ProductId { get; set; }

    public Product Product { get; set; } = null!;
}