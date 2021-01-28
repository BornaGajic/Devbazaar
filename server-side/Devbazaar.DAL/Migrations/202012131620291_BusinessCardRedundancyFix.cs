namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BusinessCardRedundancyFix : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BusinessCardCategory", "BusinessCardRefId", "dbo.BusinessCards");
            DropForeignKey("dbo.BusinessCardCategory", "CategoryRefId", "dbo.Categories");
            DropForeignKey("dbo.BusinessCards", "Id", "dbo.Businesses");
            DropForeignKey("dbo.Businesses", "Id", "dbo.Users");
            DropForeignKey("dbo.Clients", "Id", "dbo.Users");
            DropIndex("dbo.BusinessCards", new[] { "Id" });
            DropIndex("dbo.BusinessCardCategory", new[] { "BusinessCardRefId" });
            DropIndex("dbo.BusinessCardCategory", new[] { "CategoryRefId" });
            CreateTable(
                "dbo.BusinessCategory",
                c => new
                    {
                        BusinessRefId = c.Guid(nullable: false),
                        CategoryRefId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.BusinessRefId, t.CategoryRefId })
                .ForeignKey("dbo.Businesses", t => t.BusinessRefId, cascadeDelete: true)
                .ForeignKey("dbo.Categories", t => t.CategoryRefId, cascadeDelete: true)
                .Index(t => t.BusinessRefId)
                .Index(t => t.CategoryRefId);
            
            AddColumn("dbo.Businesses", "Description", c => c.String(nullable: false));
            AddColumn("dbo.Businesses", "About", c => c.String(maxLength: 300));
            AddColumn("dbo.Businesses", "Available", c => c.Boolean(nullable: false));
            AddForeignKey("dbo.Businesses", "Id", "dbo.Users", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Clients", "Id", "dbo.Users", "Id", cascadeDelete: true);
            DropTable("dbo.BusinessCards");
            DropTable("dbo.BusinessCardCategory");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.BusinessCardCategory",
                c => new
                    {
                        BusinessCardRefId = c.Guid(nullable: false),
                        CategoryRefId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.BusinessCardRefId, t.CategoryRefId });
            
            CreateTable(
                "dbo.BusinessCards",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Description = c.String(nullable: false),
                        About = c.String(maxLength: 300),
                        Available = c.Boolean(nullable: false),
                        BusinessId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            DropForeignKey("dbo.Clients", "Id", "dbo.Users");
            DropForeignKey("dbo.Businesses", "Id", "dbo.Users");
            DropForeignKey("dbo.BusinessCategory", "CategoryRefId", "dbo.Categories");
            DropForeignKey("dbo.BusinessCategory", "BusinessRefId", "dbo.Businesses");
            DropIndex("dbo.BusinessCategory", new[] { "CategoryRefId" });
            DropIndex("dbo.BusinessCategory", new[] { "BusinessRefId" });
            DropColumn("dbo.Businesses", "Available");
            DropColumn("dbo.Businesses", "About");
            DropColumn("dbo.Businesses", "Description");
            DropTable("dbo.BusinessCategory");
            CreateIndex("dbo.BusinessCardCategory", "CategoryRefId");
            CreateIndex("dbo.BusinessCardCategory", "BusinessCardRefId");
            CreateIndex("dbo.BusinessCards", "Id");
            AddForeignKey("dbo.Clients", "Id", "dbo.Users", "Id");
            AddForeignKey("dbo.Businesses", "Id", "dbo.Users", "Id");
            AddForeignKey("dbo.BusinessCards", "Id", "dbo.Businesses", "Id");
            AddForeignKey("dbo.BusinessCardCategory", "CategoryRefId", "dbo.Categories", "Id", cascadeDelete: true);
            AddForeignKey("dbo.BusinessCardCategory", "BusinessCardRefId", "dbo.BusinessCards", "Id", cascadeDelete: true);
        }
    }
}
