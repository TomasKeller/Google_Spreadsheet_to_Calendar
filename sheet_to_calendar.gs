function SpreadsheetToCalendar() 
{
  // If calendar doesn't exist, create it
  // Creates a new calendar named "Sörskogen P11" with a summary and color.
  var calid = 'Sörskogen P11';
  var calendars = CalendarApp.getCalendarsByName(calid);
Logger.log('Found %s matching calendars.', calendars.length);

  if (calendars<1){
  var calendar = CalendarApp.createCalendar(calid, {
    summary: 'Matcher SÖIF',
    color: CalendarApp.Color.RED,
    timeZone: "Europe/Stockholm"
  });
Logger.log('Created the calendar "%s", with the ID "%s".',
    calendar.getName(), calendar.getId());
  }
  // This function should be executed from the 
  //  spreadsheet you want to export to the calendar
  var mySpreadsheet = SpreadsheetApp.getActiveSheet();
  
  var myCalendar = CalendarApp.openByName(calid);
  
  // optional - delete existing events
//  var events = myCalendar.getEvents(new Date("January 1, 2011 EST"), 
//      new Date("January 1, 2013 EST"));
//  for (var i = 0; i < events.length; i++) 
//  {
//     events[i].deleteEvent();
//  }
  
  var dataRange = mySpreadsheet.getRange("A2:K17");
  var data = dataRange.getValues();
  
  // process the data
  for (i in data) 
  {
      var row = data[i];
      var myTitle = "P11 Match";  
    
      var myStartTime = new Date(row[6]);
      var hour = row[7].split(":")[0];
      var min = row[7].split(":")[1];    
      myStartTime.setHours(hour,min);
      
      var myEndTime = new Date(row[6]);
      var hour = (parseInt(row[7].split(":")[0])+1).toString();
      var min = row[7].split(":")[1];    
      myEndTime.setHours(hour,min);
    
      var myLocation = row[5];  
      var myDescription = row[3]+" vs "+row[4];  
    
   Logger.log(myStartTime);

      if (!isNaN(myStartTime)) // only add event if theStartTime exists
      {
        myCalendar.createEvent(myTitle, myStartTime, myEndTime, {location:myLocation, description:myDescription});
      }
  }
 
}


