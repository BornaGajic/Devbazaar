namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class adress_deleted_business_task_relationship : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BusinessAdress", "BusinessRefId", "dbo.Businesses");
            DropForeignKey("dbo.BusinessAdress", "AdressRefId", "dbo.Adresses");
            DropIndex("dbo.BusinessAdress", new[] { "BusinessRefId" });
            DropIndex("dbo.BusinessAdress", new[] { "AdressRefId" });
            AddColumn("dbo.Businesses", "Country", c => c.String(nullable: false, maxLength: 50));
            AddColumn("dbo.Businesses", "City", c => c.String(nullable: false, maxLength: 50));
            AddColumn("dbo.Tasks", "BusinessId", c => c.Guid(nullable: true));
            CreateIndex("dbo.Tasks", "BusinessId");
            AddForeignKey("dbo.Tasks", "BusinessId", "dbo.Businesses", "Id");
            DropTable("dbo.Adresses");
            DropTable("dbo.BusinessAdress");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.BusinessAdress",
                c => new
                    {
                        BusinessRefId = c.Guid(nullable: false),
                        AdressRefId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.BusinessRefId, t.AdressRefId });
            
            CreateTable(
                "dbo.Adresses",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 50),
                        City = c.String(nullable: false, maxLength: 50),
                        Country = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            DropForeignKey("dbo.Tasks", "BusinessId", "dbo.Businesses");
            DropIndex("dbo.Tasks", new[] { "BusinessId" });
            DropColumn("dbo.Tasks", "BusinessId");
            DropColumn("dbo.Businesses", "City");
            DropColumn("dbo.Businesses", "Country");
            CreateIndex("dbo.BusinessAdress", "AdressRefId");
            CreateIndex("dbo.BusinessAdress", "BusinessRefId");
            AddForeignKey("dbo.BusinessAdress", "AdressRefId", "dbo.Adresses", "Id", cascadeDelete: true);
            AddForeignKey("dbo.BusinessAdress", "BusinessRefId", "dbo.Businesses", "Id", cascadeDelete: true);
        }
    }
}
