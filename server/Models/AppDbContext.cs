using Microsoft.EntityFrameworkCore;

namespace server.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    
    public DbSet<Review> Reviews => Set<Review>();
}