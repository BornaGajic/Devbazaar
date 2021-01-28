namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class User : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserEntities",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Username = c.String(nullable: false, maxLength: 50),
                        Password = c.String(nullable: false, maxLength: 50),
                        Email = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            AlterColumn("dbo.Businesses", "Name", c => c.String());
            AlterColumn("dbo.Businesses", "Password", c => c.String());
            AlterColumn("dbo.Businesses", "Email", c => c.String());
            CreateIndex("dbo.Businesses", "Id");
            CreateIndex("dbo.Clients", "Id");
            AddForeignKey("dbo.Businesses", "Id", "dbo.UserEntities", "Id");
            AddForeignKey("dbo.Clients", "Id", "dbo.UserEntities", "Id");
            DropColumn("dbo.Clients", "Username");
            DropColumn("dbo.Clients", "Password");
            DropColumn("dbo.Clients", "Email");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Clients", "Email", c => c.String(nullable: false, maxLength: 50));
            AddColumn("dbo.Clients", "Password", c => c.String(nullable: false, maxLength: 50));
            AddColumn("dbo.Clients", "Username", c => c.String(nullable: false, maxLength: 50));
            DropForeignKey("dbo.Clients", "Id", "dbo.UserEntities");
            DropForeignKey("dbo.Businesses", "Id", "dbo.UserEntities");
            DropIndex("dbo.Clients", new[] { "Id" });
            DropIndex("dbo.Businesses", new[] { "Id" });
            AlterColumn("dbo.Businesses", "Email", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.Businesses", "Password", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.Businesses", "Name", c => c.String(nullable: false, maxLength: 50));
            DropTable("dbo.UserEntities");
        }
    }
}
