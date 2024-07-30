module.exports.getMututalFundUrl = (type = null) => {
  if (type == null)
    return "https://www.moneycontrol.com/mutual-funds/nav/hdfc-tax-saver-direct-plan/returns/MHD1167";
  switch (type) {
    case "mirae":
      return "https://www.moneycontrol.com/mutual-funds/nav/mirae-asset-large-cap-fund-regular-plan/MMA001";
    case "sbi-magnum":
      return "https://www.moneycontrol.com/mutual-funds/nav/sbi-magnum-midcap-fund/MSB065";
    case "hdfc-tax-saver":
        return "https://www.moneycontrol.com/mutual-funds/nav/hdfc-tax-saver-direct-plan/returns/MHD1167";
    case "hdfc-flexi":
      return "https://www.moneycontrol.com/mutual-funds/nav/hdfc-flexi-cap-fund-regular-plan-/MZU001";
    case "sbi-small-cap":
      return "https://www.moneycontrol.com/mutual-funds/nav/sbi-small-cap-fund-regular-plan-/MSA012";
  }
};

module.exports.getIndianStockMarket = (type = null) => {
    if (type == null)
        return "https://www.moneycontrol.com/india/stockpricequote/refineries/relianceindustries/RI";
    switch (type) {
        case "reliance":
        return "https://www.moneycontrol.com/financials/googleinc/overview/GOOGL";
        case "tcs":
        return "https://www.moneycontrol.com/india/stockpricequote/computers-software/tataconsultancyservices/TCS";
        case "hdfcbank":
        return "https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/hdfcbank/HDF01";
        case "bhartiairtel":
        return "https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/icicibank/ICI02";
    }
}

module.exports.getUSStockMarket = (type = null) => {
  if (type == null)
    return "https://www.moneycontrol.com/us-markets/stockpricequote/blackrock/BLK";
  switch (type) {
    case "mcd":
      return "https://www.moneycontrol.com/us-markets/stockpricequote/mcdonalds/MCD";
    case "trv":
      return "https://www.moneycontrol.com/us-markets/stockpricequote/travelerscompanies/TRV"
    case "axp":
      return "https://www.moneycontrol.com/us-markets/stockpricequote/americanexpress/AXP";
    case "blk":
      return "https://www.moneycontrol.com/us-markets/stockpricequote/blackrock/BLK"
  }
}
