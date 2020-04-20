using Microsoft.EntityFrameworkCore.Migrations;

namespace TeamManager.PeopleService.Migrations
{
    public partial class IntroducedUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "People",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "People");
        }
    }
}
