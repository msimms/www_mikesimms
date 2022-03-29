// -*- coding: utf-8 -*-
// 
// MIT License
// 
// Copyright (c) 2021 Mike Simms
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/// @function icalToEventList
function icalToEventList(ical)
{
    let event = {};
    let event_list = [];
    let lines = ical.split(/\r\n|\n\r|\n|\r/);

    lines.forEach(function myFunction(line, index, array) {
        if (line == "BEGIN:VCALENDAR") {
        }
        else if (line == "BEGIN:VEVENT") {
            event = {}
        }
        else if (line == "END:VCALENDAR") {
        }
        else if (line == "END:VEVENT") {
            event_list.push(event);
        }
        else {
            let parts = line.split(":");

            if (parts.length >= 2) {
                let key = parts[0];
                let value = parts[1];

                if (key.search("DTSTART") == 0)
                {
                    event["DTSTART"] = value;
                }
                if (key.length > 0 && value.length > 0)
                {
                    event[key] = value;
                }
            }
        }
    });

    return event_list;
}

/// @function icalUrlTojson
function icalUrlTojson(ical_url, callback)
{
    let xml_http = new XMLHttpRequest();
    let content_type = "text/calendar; charset=utf-8";

    xml_http.open("GET", ical_url, true);
    xml_http.setRequestHeader('Content-Type', content_type);
    xml_http.onreadystatechange = function()
    {
        if (xml_http.readyState == XMLHttpRequest.DONE)
        {
            let events = icalToEventList(xml_http.responseText);

            callback(xml_http.status, events);
        }
    }
    xml_http.send();
}
