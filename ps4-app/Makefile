.RECIPEPREFIX := >

TITLE       := World Library
VERSION     := 1.00
TITLE_ID    := WLIB00001
CONTENT_ID  := IV0000-WLIB00001_00-WORLDLIBRARY0001

LIBS        := -lc -lkernel -lc++ -lSceVideoOut
TOOLCHAIN   := /lib/OpenOrbisSDK
PROJDIR     := .
INTDIR      := x64/Debug

OBJS        := $(INTDIR)/main.o $(INTDIR)/common_graphics.o

CFLAGS      := --target=x86_64-pc-freebsd12-elf -fPIC -funwind-tables -c -isysroot $(TOOLCHAIN) -isystem $(TOOLCHAIN)/include
CXXFLAGS    := $(CFLAGS) -isystem $(TOOLCHAIN)/include/c++/v1
LDFLAGS     := -m elf_x86_64 -pie --script $(TOOLCHAIN)/link.x --eh-frame-hdr -L$(TOOLCHAIN)/lib $(LIBS) $(TOOLCHAIN)/lib/crt1.o

CCX         := clang++
LD          := ld.lld

all: $(CONTENT_ID).pkg

$(CONTENT_ID).pkg: pkg.gp4
>$(TOOLCHAIN)/bin/linux/PkgTool.Core pkg_build $< .

pkg.gp4: eboot.bin sce_sys/param.sfo
>$(TOOLCHAIN)/bin/linux/create-gp4 -out $@ --content-id=$(CONTENT_ID) --files $^

sce_sys/param.sfo: Makefile
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_new $@
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ APP_TYPE --type Integer --maxsize 4 --value 1
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ APP_VER --type Utf8 --maxsize 8 --value '$(VERSION)'
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ ATTRIBUTE --type Integer --maxsize 4 --value 0
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ CATEGORY --type Utf8 --maxsize 4 --value 'gd'
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ CONTENT_ID --type Utf8 --maxsize 48 --value '$(CONTENT_ID)'
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ DOWNLOAD_DATA_SIZE --type Integer --maxsize 4 --value 0
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ SYSTEM_VER --type Integer --maxsize 4 --value 0
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ TITLE --type Utf8 --maxsize 128 --value '$(TITLE)'
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ TITLE_ID --type Utf8 --maxsize 12 --value '$(TITLE_ID)'
>$(TOOLCHAIN)/bin/linux/PkgTool.Core sfo_setentry $@ VERSION --type Utf8 --maxsize 8 --value '$(VERSION)'

eboot.bin: $(OBJS)
>$(LD) $(OBJS) -o $(INTDIR)/WorldLibrary.elf $(LDFLAGS)
>$(TOOLCHAIN)/bin/linux/create-fself -in=$(INTDIR)/WorldLibrary.elf -out=$(INTDIR)/WorldLibrary.oelf --eboot eboot.bin --paid 0x3800000000000011

$(INTDIR):
>mkdir -p $(INTDIR)

$(INTDIR)/main.o: main.cpp | $(INTDIR)
>$(CCX) $(CXXFLAGS) -o $@ $<

$(INTDIR)/common_graphics.o: _common/graphics.cpp | $(INTDIR)
>$(CCX) $(CXXFLAGS) -o $@ $<

clean:
>rm -rf x64 eboot.bin pkg.gp4 $(CONTENT_ID).pkg sce_sys/param.sfo
