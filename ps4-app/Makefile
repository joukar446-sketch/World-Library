

cat > Makefile <<'EOF'
TITLE       := World Library
VERSION     := 1.00
TITLE_ID    := WLIB00001
CONTENT_ID  := IV0000-WLIB00001_00-WORLDLIBRARY0001

LIBS := -lc -lkernel -lc++ -lSceVideoOut

TOOLCHAIN := $(OO_PS4_TOOLCHAIN)
INTDIR := x64/Debug

CFILES := $(wildcard *.c)
CPPFILES := $(wildcard *.cpp)

OBJS := \
	$(patsubst %.c,$(INTDIR)/%.o,$(CFILES)) \
	$(patsubst %.cpp,$(INTDIR)/%.o,$(CPPFILES)) \
	$(INTDIR)/common_graphics.o

CFLAGS := --target=x86_64-pc-freebsd12-elf -fPIC -funwind-tables -c -isysroot $(TOOLCHAIN) -isystem $(TOOLCHAIN)/include
CXXFLAGS := $(CFLAGS) -isystem $(TOOLCHAIN)/include/c++/v1

LDFLAGS := -m elf_x86_64 -pie --script $(TOOLCHAIN)/link.x --eh-frame-hdr -L$(TOOLCHAIN)/lib $(LIBS) $(TOOLCHAIN)/lib/crt1.o

CC := clang
CCX := clang++
LD := ld.lld
CDIR := linux

all: $(CONTENT_ID).pkg

$(CONTENT_ID).pkg: pkg.gp4
	$(TOOLCHAIN)/bin/$(CDIR)/PkgTool.Core pkg_build $< .

pkg.gp4: eboot.bin sce_sys/about/right.sprx sce_sys/param.sfo
	$(TOOLCHAIN)/bin/$(CDIR)/create-gp4 -out $@ --content-id=$(CONTENT_ID) --files "$^"

sce_sys/param.sfo: Makefile
	$(TOOLCHAIN)/bin/$(CDIR)/PkgTool.Core sfo_new $@
	$(TOOLCHAIN)/bin/$(CDIR)/PkgTool.Core sfo_setentry $@ TITLE "$(TITLE)"
	$(TOOLCHAIN)/bin/$(CDIR)/PkgTool.Core sfo_setentry $@ VERSION "$(VERSION)"
	$(TOOLCHAIN)/bin/$(CDIR)/PkgTool.Core sfo_setentry $@ TITLE_ID "$(TITLE_ID)"
	$(TOOLCHAIN)/bin/$(CDIR)/PkgTool.Core sfo_setentry $@ CONTENT_ID "$(CONTENT_ID)"

eboot.bin: $(INTDIR) $(OBJS)
	$(LD) $(OBJS) -o $(INTDIR)/WorldLibrary.elf $(LDFLAGS)
	$(TOOLCHAIN)/bin/$(CDIR)/create-fself \
		-in=$(INTDIR)/WorldLibrary.elf \
		-out=$(INTDIR)/WorldLibrary.oelf \
		--eboot "eboot.bin" \
		--paid 0x3800000000000011

$(INTDIR):
	mkdir -p $(INTDIR)

$(INTDIR)/%.o: %.c
	mkdir -p $(INTDIR)
	$(CC) $(CFLAGS) -o $@ $<

$(INTDIR)/%.o: %.cpp
	mkdir -p $(INTDIR)
	$(CCX) $(CXXFLAGS) -o $@ $<

$(INTDIR)/common_graphics.o: _common/graphics.cpp
	mkdir -p $(INTDIR)
	$(CCX) $(CXXFLAGS) -o $@ $<

clean:
	rm -rf $(CONTENT_ID).pkg pkg.gp4 eboot.bin x64
EOF
