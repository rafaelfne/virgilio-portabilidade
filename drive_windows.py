import re, sys, time
from winpty import PtyProcess

proc = PtyProcess.spawn("dist\\prompts.exe", dimensions=(40, 160))
buf = ""

def wait_for(pattern, timeout=30):
    global buf
    end = time.time() + timeout
    while time.time() < end:
        try:
            buf += proc.read(4096)
        except EOFError:
            break
        if re.search(pattern, re.sub(r"\x1b\[[0-9;?]*[A-Za-z]", "", buf)):
            return True
        time.sleep(0.1)
    print("TIMEOUT esperando", pattern)
    print(re.sub(r"\x1b\[[0-9;?]*[A-Za-z]", "", buf)[-800:])
    sys.exit(1)

for pattern, keys in [("Free\\?", "y\r"), ("Nome do app", "app-vibe\r"), ("senha", "segredo123\r"), ("organiza", "\x1b[B")]:
    wait_for(pattern)
    time.sleep(0.3)
    proc.write(keys)
time.sleep(0.3)
proc.write("\r")
wait_for("platform")
clean = re.sub(r"\x1b\[[0-9;?]*[A-Za-z]", "", buf)
print([line for line in clean.splitlines() if "platform" in line][-1])
print("senha ecoada:", "segredo123" in clean)
