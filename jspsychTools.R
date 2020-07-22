#### Install R Packages ####

# install.packages("devtools")
# devtools::install_github("CrumpLab/jspsychr")
# devtools::install_github("djnavarro/jaysire")
# devtools::install_github("djnavarro/xprmntr")


#### Improved Functions ####

# Improved 'jspsychr::run_locally()'
# [Old] jspsychr::run_locally(path="exp", show_in="browser")
# [New] run()
# Strengths:
# (1) Can save data with Chinese characters into .xlsx
# (2) Provide a dialog for inputting participant ID
# (3) Automatically detect and create the 'data' folder
# (4) Automatically deal with possible duplication of data file
# (5) Throw a warning if data file is not successfully saved

run=function(path=".", exp_folder="experiment", data_folder="data",
             export=".xlsx",
             repair_csv=TRUE, add_date=FALSE,
             exclude_useless=FALSE,
             port=8000) {
  if(path==".") path=dirname(rstudioapi::getSourceEditorContext()$path)
  subID=rstudioapi::showPrompt("Participant ID", "ID", default="000")

  exp_folder=file.path(path, exp_folder)
  data_folder=file.path(path, data_folder)
  if(!dir.exists(data_folder)) dir.create(data_folder)
  static_router=plumber::PlumberStatic$new(exp_folder)

  exp_date=Sys.Date()
  exp_time=gsub(":", "-", strsplit(as.character(Sys.time()), " ")[[1]][2])
  if(add_date)
    file_id=paste("data", exp_date, "sub", subID, sep="_")
  else
    file_id=paste("data_sub", subID, sep="_")
  file_path=file.path(data_folder, paste0(file_id, export))
  if(file.exists(file_path))
    file_path=file.path(data_folder, paste0(file_id, "_", exp_date, "_", exp_time, export))

  pr=plumber::plumber$new()
  pr$mount("/", static_router)
  pr$handle("POST", "/submit", function(req, res) {
    data=jsonlite::fromJSON(iconv(req$postBody, "UTF-8", "CP936"))
    data=readr::read_csv(data$filedata)
    data$sub_id=subID
    data=data[, c(ncol(data), 1:ncol(data)-1), drop=FALSE]
    if(exclude_useless) {
      try({ data$rt=as.numeric(data$rt) }, silent=T)
      data=data[which(!is.na(data$rt)),]
      data$success=NULL
    }
    rio::export(data, file_path)
    if(export==".csv" & repair_csv) {
      csv=readLines(file_path, encoding="UTF-8")
      f=file(file_path, "w", encoding="CP936")
      cat(csv, file=f, sep="\n")
      close(f)
    }
  })
  pr$registerHook("exit", function() {
    if(file.exists(file_path))
      cat("Data successfully saved at", file_path)
    else
      message("Warning:\nFailed to save data!")
  })

  utils::browseURL(paste0("http://localhost:", port))
  pr$run(swagger=FALSE, port=port)
}


# json2df=function(json_string, new_varname=NULL) {
#   df=json_string %>% jsonlite::fromJSON() %>% unlist() %>% t() %>% as.data.frame()
#   if(!is.null(new_varname)) names(df)=gsub("^Q", new_varname, names(df))
#   return(df)
# }
#
#
# init=function(path="experiment") {
#   if(dir.exists(path)) unlink(path, recursive=T)
# }
#
#
# replace_index_html=function(encoding="utf-8") {
#   stylesheets="jspsych.css"
#   scripts=rev(list.files("experiment/resource/script"))
#   html=c("<!DOCTYPE html>",
#          "  <html>",
#          "  <head>",
#          paste0("    <meta charset='", encoding, "' />"),
#          paste0("    <link rel=\"stylesheet\" href=\"resource/style/",
#                 stylesheets, "\">"),
#          paste0("    <script src=\"resource/script/",
#                 scripts, "\"></script>"),
#          "    <script src=\"experiment.js\"></script>")
#   html=c(html, "  </head>", "  <body>", "  </body>", "</html>")
#   writeLines(html, file.path("experiment/index.html"), useBytes=T)
# }
#
#
# replace_experiment_js=function() {
#   j=readLines("experiment/experiment.js", encoding="CP936")
#   f=file("experiment/experiment.js", "w", encoding="UTF-8")
#   cat(j, file=f, sep="\n")
#   close(f)
# }


#### Keyboard Lookup ####
# 'backspace': 8
# 'tab': 9
# 'enter': 13
# 'shift': 16
# 'ctrl': 17
# 'alt': 18
# 'pause': 19
# 'capslock': 20
# 'esc': 27
# 'space': 32
# 'spacebar': 32
# ' ': 32
# 'pageup': 33
# 'pagedown': 34
# 'end': 35
# 'home': 36
# 'leftarrow': 37
# 'uparrow': 38
# 'rightarrow': 39
# 'downarrow': 40
# 'insert': 45
# 'delete': 46
# '0': 48
# '1': 49
# '2': 50
# '3': 51
# '4': 52
# '5': 53
# '6': 54
# '7': 55
# '8': 56
# '9': 57
# 'a': 65
# 'b': 66
# 'c': 67
# 'd': 68
# 'e': 69
# 'f': 70
# 'g': 71
# 'h': 72
# 'i': 73
# 'j': 74
# 'k': 75
# 'l': 76
# 'm': 77
# 'n': 78
# 'o': 79
# 'p': 80
# 'q': 81
# 'r': 82
# 's': 83
# 't': 84
# 'u': 85
# 'v': 86
# 'w': 87
# 'x': 88
# 'y': 89
# 'z': 90
# '0numpad': 96
# '1numpad': 97
# '2numpad': 98
# '3numpad': 99
# '4numpad': 100
# '5numpad': 101
# '6numpad': 102
# '7numpad': 103
# '8numpad': 104
# '9numpad': 105
# 'multiply': 106
# 'plus': 107
# 'minus': 109
# 'decimal': 110
# 'divide': 111
# 'f1': 112
# 'f2': 113
# 'f3': 114
# 'f4': 115
# 'f5': 116
# 'f6': 117
# 'f7': 118
# 'f8': 119
# 'f9': 120
# 'f10': 121
# 'f11': 122
# 'f12': 123
# '=': 187
# ',': 188
# '.': 190
# '/': 191
# '`': 192
# '[': 219
# '\\': 220
# ']': 221
