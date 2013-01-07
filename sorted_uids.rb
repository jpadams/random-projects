#!/usr/bin/ruby
# could have done this in bash with
# cut -d ':' -f  3 /etc/passwd | sort -n > foo.out
#
# but couldn't quite think of that during interview :)
 
pw = File.open("/etc/passwd")
uid = []
pw.each { |line| uid.push(line.split(':')[2].to_i) }
pw.close
out = File.open("foo.out", "w")
out.puts uid.sort
out.close

