namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TaskCategoryredundancy : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CategoryTask", "CategoryRefId", "dbo.Categories");
            DropForeignKey("dbo.CategoryTask", "TaskRefId", "dbo.Tasks");
            DropIndex("dbo.CategoryTask", new[] { "CategoryRefId" });
            DropIndex("dbo.CategoryTask", new[] { "TaskRefId" });
            AddColumn("dbo.Tasks", "CategoryEntity_Id", c => c.Guid());
            CreateIndex("dbo.Tasks", "CategoryEntity_Id");
            AddForeignKey("dbo.Tasks", "CategoryEntity_Id", "dbo.Categories", "Id");
            DropTable("dbo.CategoryTask");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.CategoryTask",
                c => new
                    {
                        CategoryRefId = c.Guid(nullable: false),
                        TaskRefId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.CategoryRefId, t.TaskRefId });
            
            DropForeignKey("dbo.Tasks", "CategoryEntity_Id", "dbo.Categories");
            DropIndex("dbo.Tasks", new[] { "CategoryEntity_Id" });
            DropColumn("dbo.Tasks", "CategoryEntity_Id");
            CreateIndex("dbo.CategoryTask", "TaskRefId");
            CreateIndex("dbo.CategoryTask", "CategoryRefId");
            AddForeignKey("dbo.CategoryTask", "TaskRefId", "dbo.Tasks", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CategoryTask", "CategoryRefId", "dbo.Categories", "Id", cascadeDelete: true);
        }
    }
}
