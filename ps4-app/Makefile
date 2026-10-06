.RECIPEPREFIX := >

TITLE := World Library
VERSION := 1.00
TITLE_ID := WLIB00001
CONTENT_ID := IV0000-WLIB00001_00-WORLDLIBRARY0001

LIBS := -lc -lkernel -lc++ -lSceVideoOut
TOOLCHAIN := $(OO_PS4_TOOLCHAIN)
INTDIR := x64/Debug

OBJS := $(INTDIR)/main.o $(INTDIR)/common_graphics.o

CFLAGS := --target=x86_64-pc-freebsd12-elf -fPIC -funwind-tables -c -isysroot $(TOOLCHAIN) -isystem $(TOOLCHAIN)/include
CXXFLAGS := $(CFLAGS) -isystem $(TOOLCHAIN)/include/c++/v1
LDFLAGS := -m elf_x86_64 -pie --script $(TOOLCHAIN)/link.x --eh-frame-hdr -L$(TOOLCHAIN)/lib $(LIBS) $(TOOLCHAIN)/lib/crt1.o

CCX := clang++
LD := ld.lld

all: eboot.bin

eboot.bin: $(OBJS)
>$(LD) $(OBJS) -o $(INTDIR)/WorldLibrary.elf $(LDFLAGS)
>create-eboot -in=$(INTDIR)/WorldLibrary.elf -out=eboot.bin -paid 0x3800000000000011

$(INTDIR):
>mkdir -p $(INTDIR)

$(INTDIR)/main.o: main.cpp | $(INTDIR)
>$(CCX) $(CXXFLAGS) -o $@ $<

$(INTDIR)/common_graphics.o: _common/graphics.cpp | $(INTDIR)
>$(CCX) $(CXXFLAGS) -o $@ $<

clean:
>rm -rf x64 eboot.bin
