import os
import socket
import threading
from tkinter import *
from tkinter import messagebox

# general port in use
port = 5050
# determine my address
#s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#s.connect(("8.8.8.8", 80))
#my_address = s.getsockname()[0]
# print(s.getsockname()[0])
# s.close()
my_address = "192.168.56.129"

# server listening


def server_listen():
    while True:
        my_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        my_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        my_socket.bind((my_address, port))
        my_socket.listen()
        conn, addr = my_socket.accept()
        filename = conn.recv(1024).decode()
        try:
            if os.path.exists(filename):
                conn.send(filename.encode() + b"\n")
                file = open(filename, "rb")
                data = file.read()
                print("sending ...")
                if data:
                    conn.send(data)
                    conn.send(b"<END>")
                file.close()
            else:
                pass
        except FileNotFoundError:
            conn.send("file not found here")
            print("File Not Found")
        conn.close()


def check_ip():
    for i in [128, 130, 131]:
        third_point = my_address.index(".", 8, None)
        hostname = my_address[:third_point + 1] + str(i)
        response = os.system(f"ping -c 2 {hostname}")
        print(hostname)
        if response == 0:
            print(hostname + " is online")
            listbox2.insert(i, hostname)
        else:
            print(hostname + " is offline")
    messagebox.showinfo("Connected", "You successfully connected to network")


def add_ip():
    listbox2.insert(1, my_address)
    threading.Thread(target=server_listen, args=()).start()
    check_ip()


def establish_connection(ip, filename):
    connect_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    connect_socket.connect((ip, port))
    filename_sent = filename
    filename = filename.encode()
    connect_socket.send(filename)
    filename_received = connect_socket.recv(1024).decode().split("\n", 1)[-2]
    print(filename_received)
    if filename_received == filename_sent:
        listbox3.insert(0, "file found in ", ip, " client")
        file = open(filename, "wb")
        file_bytes = b""
        data = connect_socket.recv(1024)
        file_bytes = data
        file.write(file_bytes[:-5])
        file.close()
    else:
        print("pass here")
        pass

    connect_socket.close()


def search_file():
    filename = entry1.get()
    for i in range(1, listbox2.size()):
        print(listbox2.get(i))
        establish_connection(listbox2.get(i), filename)


# init window
root = Tk()
root.eval('tk::PlaceWindow . center')
root.geometry("750x400")
root.title("My F2F Client")
icon = PhotoImage(file="2.png")
root.iconphoto(True, icon)

# files
Label(root, text="Search for file here", font=(
    "Comic Sans", 16)).grid(row=0, column=0)
entry1 = Entry(root, width=30)
entry1.grid(row=0, column=1)
button3 = Button(root, text="Search", font=(
    "Comic Sans", 10), command=search_file)
button3.grid(row=0, column=2)

# clients
Label(root, text="Connected Clients", font=(
    "Comic Sans", 16)).grid(row=0, column=3, padx=50)
listbox2 = Listbox(root, height=20, width=30)
listbox2.grid(row=1, column=3, padx=50)

# buttons
button1 = Button(root, text="Connect to the network",
                 font=("comic Sans", 10), command=add_ip)
button1.grid(row=4, column=3)
button2 = Button(root, text="Download file", font=("Comic Sans", 10))
button2.grid(row=4, column=0, columnspan=2, sticky="", pady=10)

# textarea
listbox3 = Listbox(root, height=20, width=80)
listbox3.grid(row=1, column=0, columnspan=3, padx=10)
root.mainloop()
