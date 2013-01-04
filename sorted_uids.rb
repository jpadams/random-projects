#!/usr/bin/ruby

pw = File.open("/etc/passwd")
uid = []
pw.each { |line| uid.push(line.split(':')[2].to_i) }
pw.close
out = File.open("foo.out", "w")
out.puts uid.sort
out.close

