namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removedmaxlen : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Businesses", "About", c => c.String());
            AlterColumn("dbo.Clients", "About", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Clients", "About", c => c.String(maxLength: 300));
            AlterColumn("dbo.Businesses", "About", c => c.String(maxLength: 300));
        }
    }
}
