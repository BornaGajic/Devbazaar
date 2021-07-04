namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Image : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Image", c => c.Binary());
            DropColumn("dbo.Users", "Logo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Users", "Logo", c => c.String());
            DropColumn("dbo.Users", "Image");
        }
    }
}
