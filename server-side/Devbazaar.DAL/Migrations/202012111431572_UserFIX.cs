namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserFIX : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.UserEntities", newName: "Users");
            DropColumn("dbo.Businesses", "Name");
            DropColumn("dbo.Businesses", "Password");
            DropColumn("dbo.Businesses", "Email");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Businesses", "Email", c => c.String());
            AddColumn("dbo.Businesses", "Password", c => c.String());
            AddColumn("dbo.Businesses", "Name", c => c.String());
            RenameTable(name: "dbo.Users", newName: "UserEntities");
        }
    }
}
