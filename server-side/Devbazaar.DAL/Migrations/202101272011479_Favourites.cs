namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Favourites : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Favourites",
                c => new
                    {
                        FavClientRefId = c.Guid(nullable: false),
                        FavBusinessRefId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.FavClientRefId, t.FavBusinessRefId })
                .ForeignKey("dbo.Clients", t => t.FavClientRefId, cascadeDelete: false)
                .ForeignKey("dbo.Businesses", t => t.FavBusinessRefId, cascadeDelete: false)
                .Index(t => t.FavClientRefId)
                .Index(t => t.FavBusinessRefId);
            
            AddColumn("dbo.Businesses", "PostalCode", c => c.Int(nullable: false));
            AddColumn("dbo.Clients", "FirstName", c => c.String(nullable: false));
            AddColumn("dbo.Clients", "LastName", c => c.String(nullable: false));
            AddColumn("dbo.Users", "Logo", c => c.String());
            DropColumn("dbo.Businesses", "Logo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Businesses", "Logo", c => c.String());
            DropForeignKey("dbo.Favourites", "FavBusinessRefId", "dbo.Businesses");
            DropForeignKey("dbo.Favourites", "FavClientRefId", "dbo.Clients");
            DropIndex("dbo.Favourites", new[] { "FavBusinessRefId" });
            DropIndex("dbo.Favourites", new[] { "FavClientRefId" });
            DropColumn("dbo.Users", "Logo");
            DropColumn("dbo.Clients", "LastName");
            DropColumn("dbo.Clients", "FirstName");
            DropColumn("dbo.Businesses", "PostalCode");
            DropTable("dbo.Favourites");
        }
    }
}
