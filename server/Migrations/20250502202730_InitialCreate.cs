using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    ImagePath = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
            
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Name", "Category", "Price", "ImagePath", "Description" },
                values: new object[,]
                {
                    { 1, "Fender Stratocaster", 0, 89990.00m, "/images/strat.jpg", "Легендарная электрогитара, популярная среди профессионалов по всему миру." },
                    { 2, "Yamaha Acoustic", 0, 25990.00m, "/images/yamaha.jpg", "Акустическая гитара с тёплым и насыщенным звучанием — отличный выбор для начинающих и продвинутых." },
                    { 3, "Pearl Drum Kit", 1, 64990.00m, "/images/drumkit.jpg", "Полноценная ударная установка для живых выступлений и студийной записи." },
                    { 4, "Shure SM58", 3, 12490.00m, "/images/sm58.jpg", "Сценический микрофон номер один — стандарт для вокалистов и ведущих." },
                    { 5, "Casio Keyboard", 2, 19990.00m, "/images/casio.jpg", "Цифровой синтезатор с 61 клавишей, идеален для начинающих музыкантов." },
                    { 6, "Guitar Strings", 4, 590.00m, "/images/strings.jpg", "Комплект струн для электрогитары — прочные, долговечные, с ярким тоном." },
                    { 7, "Guitar Stand", 4, 1490.00m, "/images/stand.jpg", "Регулируемая подставка для гитары — надёжная и устойчивая." },
                    { 8, "Electronic Drum Pads", 1, 57990.00m, "/images/drumpads.jpg", "Универсальные электронные ударные пэды для практики и лайвов." },
                    { 9, "Condenser Mic", 3, 27490.00m, "/images/condenser.jpg", "Студийный конденсаторный микрофон для записи вокала и инструментов." },
                    { 10, "Synthesizer", 2, 89990.00m, "/images/synth.jpg", "Мощный аналогово-цифровой синтезатор для профессионального звука и творчества." }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
