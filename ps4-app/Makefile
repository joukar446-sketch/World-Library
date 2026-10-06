TITLE       := World Library
VERSION     := 1.00
TITLE_ID    := WLIB00001
CONTENT_ID  := IV0000-WLIB00001_00-WORLDLIBRARY0001

LIBS        := -lc -lkernel -lc++ -lSceVideoOut

ASSETS      := $(wildcard assets/**/*)
LIBMODULES  := $(wildcard sce_module/*)

TOOLCHAIN   := $(OO_PS4_TOOLCHAIN)
PROJDIR     := .
COMMONDIR   := $(TOOLCHAIN)/samples/_common
INTDIR      := x64/Debug

CFILES      := $(wildcard *.c)
CPPFILES    := $(wildcard *.cpp)
COMMONFILES := $(wildcard $(COMMONDIR)/*.cpp)

OBJS := \
	$(patsubst %.c,$(INTDIR)/%.o,$(CFILES)) \
	$(patsubst %.cpp,$(INTDIR)/%.o,$(CPPFILES)) \
	$(patsubst $(COMMONDIR)/%.cpp,$(INTDIR)/common_%.o,$(COMMONFILES))

CFLAGS   := --target=x86_64-pc-freebsd12-elf -fPIC -funwind-tables -c $(EXTRAFLAGS) -isysroot $(TOOLCHAIN) -isystem $(TOOLCHAIN)/include
CXXFLAGS := $(CFLAGS) -isystem $(TOOLCHAIN)/include/c++/v1

LDFLAGS := -m elf_x86_64 -pie --script $(TOOLCHAIN)/link.x --eh-frame-hdr -L$(TOOLCHAIN)/lib $(LIBS) $(TOOLCHAIN)/lib/crt1.o

UNAME_S := $(shell uname -s)

ifeq ($(UNAME_S),Linux)
	CC  := clang
	CCX := clang++
	LD  := ld.lld
	CDIR := linux
endif

all: $(CONTENT_ID).pkg

$(CONTENT_ID).pkg: pkg.gp4
	$(TOOLCHAIN)/bin/$(CDIR)/PkgTool.Core pkg_build $< .

pkg.gp4: eboot.bin sce_sys/about/right.sprx sce_sys/param.sfo $(LIBMODULES) $(ASSETS)
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

$(INTDIR)/common_%.o: $(COMMONDIR)/%.cpp
	mkdir -p $(INTDIR)
	$(CCX) $(CXXFLAGS) -o $@ $<

clean:
	rm -rf $(CONTENT_ID).pkg pkg.gp4 eboot.bin x64
