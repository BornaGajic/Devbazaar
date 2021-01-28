namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class logoToBase64String : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Businesses", "Logo", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Businesses", "Logo", c => c.Binary());
        }
    }
}
