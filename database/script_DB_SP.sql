USE [master]
GO
/****** Object:  Database [Auctionssajt]    Script Date: 2025-04-01 19:17:47 ******/
CREATE DATABASE [Auctionssajt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Auctionssajt', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Auctionssajt.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Auctionssajt_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Auctionssajt_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Auctionssajt] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Auctionssajt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Auctionssajt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Auctionssajt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Auctionssajt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Auctionssajt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Auctionssajt] SET ARITHABORT OFF 
GO
ALTER DATABASE [Auctionssajt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Auctionssajt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Auctionssajt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Auctionssajt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Auctionssajt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Auctionssajt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Auctionssajt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Auctionssajt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Auctionssajt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Auctionssajt] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Auctionssajt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Auctionssajt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Auctionssajt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Auctionssajt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Auctionssajt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Auctionssajt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Auctionssajt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Auctionssajt] SET RECOVERY FULL 
GO
ALTER DATABASE [Auctionssajt] SET  MULTI_USER 
GO
ALTER DATABASE [Auctionssajt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Auctionssajt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Auctionssajt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Auctionssajt] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Auctionssajt] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Auctionssajt] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Auctionssajt', N'ON'
GO
ALTER DATABASE [Auctionssajt] SET QUERY_STORE = ON
GO
ALTER DATABASE [Auctionssajt] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Auctionssajt]
GO
/****** Object:  Table [dbo].[Auctions]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auctions](
	[AuctionId] [int] IDENTITY(1,1) NOT NULL,
	[AuctionName] [varchar](100) NOT NULL,
	[openingtime] [datetime] NOT NULL,
	[ClosingTime] [datetime] NULL,
	[Userid] [int] NOT NULL,
	[AuctionDescription] [text] NOT NULL,
	[StartingPrice] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AuctionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bids]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bids](
	[BidId] [int] IDENTITY(1,1) NOT NULL,
	[Bidamount] [int] NOT NULL,
	[bidtime] [datetime] NULL,
	[UserId] [int] NOT NULL,
	[AuctionId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BidId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[UserPassword] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Bids] ADD  DEFAULT (getdate()) FOR [bidtime]
GO
ALTER TABLE [dbo].[Auctions]  WITH CHECK ADD FOREIGN KEY([Userid])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Bids]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Bids]  WITH CHECK ADD  CONSTRAINT [FK_Bids_AuctionId] FOREIGN KEY([AuctionId])
REFERENCES [dbo].[Auctions] ([AuctionId])
GO
ALTER TABLE [dbo].[Bids] CHECK CONSTRAINT [FK_Bids_AuctionId]
GO
/****** Object:  StoredProcedure [dbo].[CreateAuction]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[CreateAuction] 
@AuctionName varchar(100), 
@AuctionDescription Text, 
@StartingPrice decimal(10,2), 
@OpeningTime Datetime,  
@ClosingTime Datetime,  
@UserId INT  
as 
begin

set nocount on;  
PRINT 'Auction Name: ' + @AuctionName +
      ', Auction Description: ' + CAST(@AuctionDescription AS NVARCHAR(MAX)) +
      ', Starting Price: ' + CAST(@StartingPrice AS NVARCHAR(50)) +
      ', Opening Time: ' + CAST(@OpeningTime AS NVARCHAR(50)) +
      ', Closing Time: ' + CAST(@ClosingTime AS NVARCHAR(50));

If @Closingtime <= @Openingtime begin  throw 50000, 'Closing time have to be later than the opening time', 
1; return; end  insert into dbo.Auctions (AuctionName, AuctionDescription, StartingPrice,  OpeningTime, ClosingTime, UserId)  
Values (@AuctionName, @AuctionDescription, @StartingPrice, @OpeningTime, @ClosingTime, @UserId)  
Select scope_identity() AS NewAuctionId;
--SELECT CASE 
         --WHEN TRY_CAST(@StartingPrice AS DECIMAL(10, 2)) IS NOT NULL THEN CAST(@StartingPrice AS DECIMAL(10, 2)) 
         --ELSE 0 -- or another default value
       --END AS ValidDecimalValue
End;
GO
/****** Object:  StoredProcedure [dbo].[CreateDisposition]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateDisposition]
    @CustomerID INT,
    @AccountID INT,
    @Type NVARCHAR(50)
AS
BEGIN
    INSERT INTO Dispositions (CustomerID, AccountID, Type)
    VALUES (@CustomerID, @AccountID, @Type);
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteAuctionIfNoBids]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[DeleteAuctionIfNoBids] @AuctionId INT  as begin set nocount on;  if not exists (select 1 from bids where auctionid = @AuctionId) begin delete from Auctions Where auctionId = @AuctionId;  select 1 as Success, 'Auction deleted successfully' AS Message; End else begin  select 0 AS success, 'Cannot delete auction when bids are made' AS Message; END End;
GO
/****** Object:  StoredProcedure [dbo].[GetAccountsByUserId]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAccountsByUserId]
    @CustomerId INT
AS
BEGIN
    SELECT a.AccountID, a.Frequency, a.Created, a.Balance, a.AccountTypesID
    FROM Accounts a
    INNER JOIN Dispositions d ON a.AccountID = d.AccountID
    WHERE d.CustomerID = @CustomerId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllUsers]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetAllUsers]
as
begin
select userid,username
from users

end;
GO
/****** Object:  StoredProcedure [dbo].[Login]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[Login] @Username nvarchar(50),@Password nvarchar(225)
as
begin
select * from Users where Username=@Username and UserPassword = @Password
end;
GO
/****** Object:  StoredProcedure [dbo].[MakeBid]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[MakeBid]
@UserID INT,
@AuctionID INT,
@Amount INT
AS
BEGIN 
DECLARE @CTime DATETIME;
SELECT @CTime = ClosingTime
FROM Auctions
WHERE AuctionId = @AuctionID;


IF (@CTime > GETDATE())
BEGIN

    IF NOT EXISTS (SELECT 1 FROM Bids WHERE AuctionId = @AuctionID AND BidAmount >= @Amount)
    BEGIN

        INSERT INTO Bids (BidAmount, AuctionID, UserID)
        VALUES (@Amount, @AuctionID, @UserID);


        SELECT 1
    END
    ELSE
    BEGIN

        SELECT 0
    END
END
ELSE
BEGIN

    SELECT 0
END
END;
GO
/****** Object:  StoredProcedure [dbo].[RegisterUsers]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RegisterUsers]
@UserName NVARCHAR(50),
@UserPassword NVARCHAR(255)
AS
BEGIN
INSERT INTO Users (Username, UserPassword) VALUES (@UserName, @UserPassword);
END;

GO
/****** Object:  StoredProcedure [dbo].[RemoveBid]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[RemoveBid] @UserID int,@BidId int
as
begin

declare @‌CT datetime;
declare @‌AuID int;

if exists(select 1 from Bids where BidId=@BidId and UserId = @UserID)
begin

select @‌AuID = AuctionId from Bids where BidId = @BidId and UserId = @UserID;

select @‌CT = ClosingTime from Auctions where AuctionId = @‌AuID;

if @‌CT > GETDATE()
begin

delete from Bids where BidId = @BidId and UserId = @UserID
select 1;
return;
end

end
select 0
end;
GO
/****** Object:  StoredProcedure [dbo].[SearchAuction]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchAuction]
    @Keyword NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- If @Keyword is NULL or empty, return all auctions
    IF (@Keyword IS NULL OR @Keyword = '')
    BEGIN
        SELECT 
            A.AuctionId,
            A.AuctionName,
            A.AuctionDescription,
            A.StartingPrice,
            A.UserId,
            A.OpeningTime,
            A.ClosingTime
        FROM 
            Auctions A
        ORDER BY 
            A.ClosingTime ASC;
    END
    ELSE
    BEGIN
        SELECT 
            A.AuctionId,
            A.AuctionName,
            A.AuctionDescription,
            A.StartingPrice,
            A.UserId,
            A.OpeningTime,
            A.ClosingTime
        FROM 
            Auctions A
        WHERE 
            A.AuctionName LIKE '%' + @Keyword + '%'
            OR A.AuctionDescription LIKE '%' + @Keyword + '%'
        ORDER BY 
            A.ClosingTime ASC;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[SearchAuction_new]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchAuction_new] 
    @Keyword NVARCHAR(255) = NULL
AS
BEGIN
    IF @Keyword IS NULL OR @Keyword = ''
    BEGIN
        SELECT * FROM Auctions;
    END
    ELSE
    BEGIN
        SELECT * FROM Auctions
        WHERE AuctionName LIKE '%' + @Keyword + '%'
           OR AuctionDescription LIKE '%' + @Keyword + '%';
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SearchAuction2]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchAuction2]
    @Keyword NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        A.AuctionId,
        A.AuctionName,
        A.AuctionDescription,
        A.StartingPrice,
        A.UserId AS CreatedbyUser,
		A.OpeningTime,
        A.ClosingTime
    FROM 
        Auctions A
    WHERE 
        A.AuctionName LIKE '%' + @Keyword + '%'
        OR A.AuctionDescription LIKE '%' + @Keyword + '%'
    ORDER BY 
        A.ClosingTime ASC; -- You can change the order based on your requirement
END;
GO
/****** Object:  StoredProcedure [dbo].[SearchAuctionById_new]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchAuctionById_new]
@AuctionId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the auction exists
    IF NOT EXISTS (SELECT 1 FROM Auctions WHERE AuctionId = @AuctionId)
    BEGIN
        SELECT 
            'Auction not found' AS Message,
            NULL AS AuctionId,
            NULL AS AuctionName,
            NULL AS AuctionDescription,
            NULL AS StartingPrice,
            NULL AS ClosingTime,
            NULL AS BidId,
            NULL AS BidAmount,
            NULL AS BidTime,
            NULL AS UserId,
            NULL AS Username;
        RETURN;
    END

    -- Check if the auction has ended
    IF EXISTS (SELECT 1 FROM Auctions WHERE AuctionId = @AuctionId AND ClosingTime < GETDATE())
    BEGIN
        -- Auction has ended: show only the latest bid and winner
        IF EXISTS (SELECT 1 FROM Bids WHERE AuctionId = @AuctionId)
        BEGIN
            SELECT 
                'Auction ended with bids' AS Message,
                A.AuctionId,
                A.AuctionName,
                A.AuctionDescription,
                A.StartingPrice,
                A.ClosingTime,
B.BidId AS BidId,
B.BidAmount AS BidAmount,
B.BidTime AS BidTime,
U.UserId AS UserId,
U.Username AS Username
            FROM 
                Auctions A
            INNER JOIN 
                Bids B ON A.AuctionId = B.AuctionId
            INNER JOIN 
                Users U ON B.UserId = U.UserId
            WHERE 
                A.AuctionId = @AuctionId
                AND B.BidAmount = (
                    SELECT MAX(BidAmount)
                    FROM Bids
                    WHERE AuctionId = @AuctionId
                );
        END
        ELSE
        BEGIN
            SELECT 
                'Auction ended with no bids' AS Message,
                A.AuctionId,
                A.AuctionName,
                A.AuctionDescription,
                A.StartingPrice,
                A.ClosingTime,
                NULL AS BidId,
                NULL AS BidAmount,
                NULL AS BidTime,
                NULL AS UserId,
                NULL AS Username
            FROM Auctions A
            WHERE A.AuctionId = @AuctionId;
        END
    END
    ELSE
    BEGIN
        -- Auction is still ongoing: show all current bids (highest first)
        SELECT 
            'Auction ongoing' AS Message,
            A.AuctionId,
            A.AuctionName,
            A.AuctionDescription,
            A.StartingPrice,
            A.ClosingTime,
            B.BidId,
            B.BidAmount,
            B.BidTime,
            U.UserId,
            U.Username
        FROM 
            Auctions A
        LEFT JOIN 
            Bids B ON A.AuctionId = B.AuctionId
        LEFT JOIN 
            Users U ON B.UserId = U.UserId
        WHERE 
            A.AuctionId = @AuctionId
        ORDER BY 
            B.BidAmount DESC;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[SearchAuctions]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchAuctions]
    @Keyword NVARCHAR(100)
AS
BEGIN
    SELECT * 
    FROM Auctions
    WHERE AuctionName LIKE @Keyword OR AuctionDescription LIKE @Keyword;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateAuction_new]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateAuction_new]
@AuctionName varchar(100) = null,
@ClosingTime datetime = null,
@AuctionDescription text = null,
@StartingPrice decimal(10,2) = null,
@AuctionId int,
@UserID int
AS
BEGIN
    -- Check if auction exists and belongs to the user
    IF EXISTS (SELECT 1 FROM Auctions WHERE AuctionId = @AuctionId AND UserId = @UserID)
    BEGIN
        -- If there are no bids, allow updating all fields
        IF NOT EXISTS (SELECT 1 FROM Bids WHERE AuctionId = @AuctionId)
        BEGIN
            UPDATE Auctions
            SET
                AuctionName = COALESCE(@AuctionName, AuctionName),
                ClosingTime = COALESCE(@ClosingTime, ClosingTime),
                AuctionDescription = COALESCE(@AuctionDescription, AuctionDescription),
                StartingPrice = COALESCE(@StartingPrice, StartingPrice)
            WHERE AuctionId = @AuctionId
            SELECT 1
        END
        -- If there are bids, allow updating all except StartingPrice
        ELSE
        BEGIN
            UPDATE Auctions
            SET
                AuctionName = COALESCE(@AuctionName, AuctionName),
                ClosingTime = COALESCE(@ClosingTime, ClosingTime),
                AuctionDescription = COALESCE(@AuctionDescription, AuctionDescription)
            WHERE AuctionId = @AuctionId
            SELECT 1
        END
    END
    ELSE
    BEGIN
        SELECT 0
    END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateUsers]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateUsers]
@UserId INT,
@UserName NVARCHAR(50),
@UserPassword NVARCHAR(255)
AS
BEGIN
UPDATE Users
SET Username = @UserName, UserPassword = @UserPassword
WHERE UserId = @UserId;
END;
GO
/****** Object:  StoredProcedure [dbo].[ViewAllBidsWithID]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[ViewAllBidsWithID] @UserID int as begin select * from Bids where UserId = @UserID end;
GO
/****** Object:  StoredProcedure [dbo].[ViewBidsOnAuction]    Script Date: 2025-04-01 19:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[ViewBidsOnAuction] @AuctionID int
as
begin
declare @‌CT datetime;

select @‌CT = ClosingTime from Auctions where AuctionId = @AuctionID;

if @‌CT > GETDATE()
begin
select * from Bids where AuctionId = @AuctionID order by Bidamount desc
end
else
begin

select top 1 * from Bids where AuctionId=@AuctionID order by Bidamount desc

end

end;
GO
USE [master]
GO
ALTER DATABASE [Auctionssajt] SET  READ_WRITE 
GO
