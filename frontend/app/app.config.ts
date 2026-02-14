export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: [
          'h-fit rounded-[5px] font-normal inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
          'relative overflow-hidden',
          'before:absolute before:inset-0 before:bg-[#FF0000] before:-translate-x-full before:transition-transform before:duration-300 before:ease-out before:z-0',
          'hover:before:translate-x-0 focus-visible:before:translate-x-0'
        ],
        label: 'truncate relative z-10 mx-auto',
        leadingIcon: 'shrink-0 relative z-10',
        trailingIcon: 'shrink-0 relative z-10',
        leadingAvatar: 'shrink-0 relative z-10'
      },
      variants: {
        color: {
          primary: '',
          custom: ''
        },
        variant: {
          solid: '',
          outline: '',
          link: '',
          custom: ''
        },
        size: {
          xs: {
            base: 'px-2 py-1 text-xs gap-1',
            leadingIcon: 'size-4',
            trailingIcon: 'size-4'
          },
          sm: {
            base: 'px-2.5 py-1.5 text-xs gap-1.5',
            leadingIcon: 'size-4',
            trailingIcon: 'size-4'
          },
          md: {
            base: 'px-2.5 py-1.5 text-sm gap-1.5',
            leadingIcon: 'size-5',
            trailingIcon: 'size-5'
          }
        }
      },
      compoundVariants: [
        {
          color: 'custom',
          variant: 'custom',
          class: {
            base: [
              'border border-[#FF0000] text-white ',
              'text-xs md:text-sm',
              'hover:text-white focus-visible:text-white',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000]'
            ]
          }
        },
        {
          color: 'custom',
          variant: 'link',
          class: {
            base: [
              'border-0 bg-transparent rounded-none',
              'font-semibold text-sm',
              'cursor-pointer hover:cursor-pointer',
              'p-0',
              'before:hidden',
              'focus-visible:outline-none'
            ]
          }
        },
        {
          color: 'custom',
          variant: 'soft',
          class: {
            base: [
              'border border-[#FF0000] text-white bg-[var(--main-red)]',
              'text-xs md:text-sm',
              'hover:text-white focus-visible:text-white',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000]'
            ]
          }
        },
      ],
      defaultVariants: {
        color: 'custom',
        variant: 'custom',
        size: 'md'
      }
    },
    select: {
      slots: {
        base: [
          'relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'absolute inset-y-0 end-0 flex items-center',
        trailingIcon: 'shrink-0 text-dimmed',
        value: 'truncate pointer-events-none',
        placeholder: 'truncate text-dimmed',


        viewport: 'relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1',
        group: 'p-1 isolate',
        empty: 'text-center text-blue-600',
        label: 'font-semibold ',
        separator: '-mx-1 my-1 h-px bg-border',
        item: [
          'group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-white data-highlighted:not-data-disabled:before:bg-elevated/50',
          'transition-colors before:transition-colors'
        ],
        itemLeadingIcon: [
          'shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default',
          'transition-colors'
        ],
        itemLeadingAvatar: 'shrink-0',
        itemLeadingAvatarSize: '',
        itemLeadingChip: 'shrink-0',
        itemLeadingChipSize: '',
        itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
        itemTrailingIcon: 'shrink-0',
        itemWrapper: 'flex-1 flex flex-col min-w-0',
        itemLabel: 'truncate',
        itemDescription: 'truncate text-blue-600'
      },
      variants: {
        fieldGroup: {
          horizontal: 'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]',
          vertical: 'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]'
        },
        size: {
          xs: {
            base: 'px-2 py-1 text-xs gap-1',
            leading: 'ps-2',
            trailing: 'pe-2',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4',
            label: 'p-1 text-[10px]/3 gap-1',
            item: 'p-1 text-xs gap-1',
            itemLeadingIcon: 'size-4',
            itemLeadingAvatarSize: '3xs',
            itemLeadingChip: 'size-4',
            itemLeadingChipSize: 'sm',
            itemTrailingIcon: 'size-4',
            empty: 'p-1 text-xs'
          },
          sm: {
            base: 'px-2.5 py-1.5 text-xs gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4',
            label: 'p-1.5 text-[10px]/3 gap-1.5',
            item: 'p-1.5 text-xs gap-1.5',
            itemLeadingIcon: 'size-4',
            itemLeadingAvatarSize: '3xs',
            itemLeadingChip: 'size-4',
            itemLeadingChipSize: 'sm',
            itemTrailingIcon: 'size-4',
            empty: 'p-1.5 text-xs'
          },
          md: {
            base: 'px-2.5 py-1.5 text-sm gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
            label: 'p-1.5 text-xs gap-1.5',
            item: 'p-1.5 text-sm gap-1.5',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemLeadingChip: 'size-5',
            itemLeadingChipSize: 'md',
            itemTrailingIcon: 'size-5',
            empty: 'p-1.5 text-sm'
          },
          lg: {
            base: 'px-3 py-2 text-sm gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
            label: 'p-2 text-xs gap-2',
            item: 'p-2 text-sm gap-2',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemLeadingChip: 'size-5',
            itemLeadingChipSize: 'md',
            itemTrailingIcon: 'size-5',
            empty: 'p-2 text-sm'
          },
          xl: {
            base: 'px-3 py-2 text-base gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-6',
            label: 'p-2 text-sm gap-2',
            item: 'p-2 text-base gap-2',
            itemLeadingIcon: 'size-6',
            itemLeadingAvatarSize: 'xs',
            itemLeadingChip: 'size-6',
            itemLeadingChipSize: 'lg',
            itemTrailingIcon: 'size-6',
            empty: 'p-2 text-base'
          }
        },
        variant: {
          outline: 'text-highlighted bg-transparent ring ring-inset ring-accented',
          soft: 'text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-none disabled:bg-elevated/50',
          subtle: 'w-full rounded-[42px] border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          ghost: 'text-highlighted bg-transparent hover:bg-elevated focus:bg-none disabled:bg-transparent dark:disabled:bg-transparent',
          none: 'text-highlighted bg-transparent'
        },
        color: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: ''
        },
        leading: {
          true: ''
        },
        trailing: {
          true: ''
        },
        loading: {
          true: ''
        },
        highlight: {
          true: ''
        },
        type: {
          file: 'file:me-1.5 file:font-medium file:text-blue-600 file:outline-none'
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: [
            'outline'
          ],
          class: 'focus:ring-2 focus:ring-inset focus:ring-primary'
        },
        {
          color: 'primary',
          variant: ['subtle'],
          // class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--main-red)]'
            class: {
              base: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--main-red)]',
              viewport: 'bg-white rounded-xl shadow-lg max-h-72 overflow-y-auto p-1 space-y-1',
              item: 'px-3 py-2 rounded-lg text-sm cursor-pointer data-highlighted:bg-[var(--main-red)] data-highlighted:text-white transition-colors',
              itemWrapper: 'flex-1 flex flex-col min-w-0',
              itemLabel: 'truncate font-medium focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--main-red)]',
              itemDescription: 'truncate text-xs text-blue-600'
            }
        },
        {
          color: 'primary',
          highlight: true,
          class: 'ring ring-inset ring-primary'
        },
        {
          color: 'neutral',
          variant: [
            'outline',
            'subtle'
          ],
          class: 'focus:ring-2 focus:ring-inset focus:ring-inverted'
        },
        {
          color: 'neutral',
          highlight: true,
          class: 'ring ring-inset ring-inverted'
        },
        {
          leading: true,
          size: 'xs',
          class: 'ps-7'
        },
        {
          leading: true,
          size: 'sm',
          class: 'ps-8'
        },
        {
          leading: true,
          size: 'md',
          class: 'ps-9'
        },
        {
          leading: true,
          size: 'lg',
          class: 'ps-10'
        },
        {
          leading: true,
          size: 'xl',
          class: 'ps-11'
        },
        {
          trailing: true,
          size: 'xs',
          class: 'pe-7'
        },
        {
          trailing: true,
          size: 'sm',
          class: 'pe-8'
        },
        {
          trailing: true,
          size: 'md',
          class: 'pe-9'
        },
        {
          trailing: true,
          size: 'lg',
          class: 'pe-10'
        },
        {
          trailing: true,
          size: 'xl',
          class: 'pe-11'
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: 'animate-spin'
          }
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: 'animate-spin'
          }
        }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'outline'
      }
    },
    carousel: {
      slots: {
        root: 'relative focus:outline-none',
        viewport: 'overflow-hidden',
        container: 'flex items-start',
        item: 'min-w-0 shrink-0 basis-full',
        controls: '',
        arrows: '',
        prev: 'absolute rounded-full bg-transparent text-white border-0 outline-0 ring-0 disabled:bg-transparent before:hidden hover:before:translate-x-0 focus-visible:before:translate-x-0 hover:bg-transparent active:bg-transparent',
        next: 'absolute rounded-full bg-transparent text-white border-0 outline-0 ring-0 before:hidden hover:before:translate-x-0 focus-visible:before:translate-x-0 hover:bg-transparent active:bg-transparent disabled:bg-transparent',
        dots: 'absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3',
        dot: [
          'cursor-pointer size-3 bg-accented rounded-full bg-[var(--main-red-50)] data-[state=active]:bg-[var(--main-red)]' ,
          'transition'
        ]
      },
      variants: {
        orientation: {
          vertical: {
            container: 'flex-col -mt-4',
            item: 'pt-4',
            prev: 'top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
            next: 'bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90'
          },
          horizontal: {
            container: 'flex-row -ms-4',
            item: 'ps-4',
            prev: 'start-4 sm:-start-12 top-1/2 -translate-y-1/2',
            next: 'end-4 sm:-end-12 top-1/2 -translate-y-1/2'
          }
        },
        active: {
          true: {
            dot: 'data-[state=active]:bg-[var(--main-red)]'
          }
        }
      }
    },
    tooltip: {
      slots: {
        content:
          '!h-auto flex items-center gap-1 bg-[var(--main-black)] text-white shadow-sm rounded-sm ring ring-0 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto',
        arrow: 'fill-default',
        text: 'whitespace-normal break-words leading-snug',
        kbds:
          "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
        kbdsSize: 'sm'
      }
    },
    popover: {
      slots: {
        content: '!h-auto flex items-center gap-1 bg-[var(--main-black)] text-white shadow-sm rounded-sm ring ring-0 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto',
        arrow: 'fill-default'
      }
    },
    breadcrumb: {
      slots: {
        list: 'flex items-center gap-1.5 flex-wrap',
        link: 'text-[12px] !text-[var(--main-text-color)] !font-normal',
        separatorIcon: '!text-[var(--main-text-color)]'
      },
      variants: {
        active: {
          true: {
            link: '!text-[var(--main-red)] font-semibold'
          },
          false: {
            link: 'text-muted font-medium'
          }
        },
        disabled: {
          true: {
            link: 'cursor-not-allowed opacity-75'
          }
        },
        to: {
          true: ''
        }
      },
    },
    chip: {
      slots: {
        base: '!h-[20px] !w-[20px] !flex items-center rounded-full font-medium  text-sm border-0 ring-0 max-w-xs',
        label: 'whitespace-nowrap',
        leadingIcon: 'shrink-0',
        trailingIcon: 'shrink-0'
      }
    },
    slideover: {
      slots: {
        content: 'bg-[var(--card-black-bg)] px-6 shadow-lg !border-0 !ring-0 text-[var(--main-text-color)]',
        overlay: 'bg-black/50 backdrop-blur-sm',
        header: '!mx-4 !px-0 py-1 border-b border-[#FFFFFF29]',
        body: '!px-4'
      }
    },
    modal: {
      slots: {
        overlay: '!bg-black/50 backdrop-blur-sm',
        content: 'bg-[var(--card-black-bg)] px-6 shadow-lg !border-0 !ring-0 text-[var(--main-text-color)]',
        header: '!mx-4 !px-0 py-1 border-b border-[#FFFFFF29]',
        body: '!px-4'
      },
    },
    input: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-[42px] border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'absolute inset-y-0 end-0 flex items-center',
        trailingIcon: 'shrink-0 text-dimmed'
      },
      variants: {
        fieldGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: 'group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none'
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: 'group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none'
          }
        },
        size: {
          xs: {
            base: 'px-2 py-1 text-xs gap-1',
            leading: 'ps-2',
            trailing: 'pe-2',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4'
          },
          sm: {
            base: 'px-2.5 py-1.5 text-xs gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4'
          },
          md: {
            base: 'px-2.5 py-1.5 text-sm gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          },
          lg: {
            base: 'px-3 py-2 text-sm gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          },
          xl: {
            base: 'px-3 py-2 text-base gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-6'
          }
        },
        variant: {
          outline: 'text-highlighted bg-default ring ring-inset ring-accented',
          soft: 'text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50',
          subtle: 'text-highlighted bg-elevated ring ring-inset ring-accented',
          ghost: 'text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent',
          none: 'text-highlighted bg-transparent'
        },
        color: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: ''
        },
        leading: {
          true: ''
        },
        trailing: {
          true: ''
        },
        loading: {
          true: ''
        },
        highlight: {
          true: ''
        },
        type: {
          file: 'file:me-1.5 file:font-medium file:text-muted file:outline-none'
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: ['outline', 'subtle'],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--main-red)]'
        },
        {
          color: 'primary',
          highlight: true,
          class: 'ring ring-inset ring-primary'
        },
        {
          color: 'neutral',
          variant: ['outline', 'subtle'],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted'
        },
        {
          color: 'neutral',
          highlight: true,
          class: 'ring ring-inset ring-inverted'
        },
        {
          leading: true,
          size: 'xs',
          class: 'ps-7'
        },
        {
          leading: true,
          size: 'sm',
          class: 'ps-8'
        },
        {
          leading: true,
          size: 'md',
          class: 'ps-9'
        },
        {
          leading: true,
          size: 'lg',
          class: 'ps-10'
        },
        {
          leading: true,
          size: 'xl',
          class: 'ps-11'
        },
        {
          trailing: true,
          size: 'xs',
          class: 'pe-7'
        },
        {
          trailing: true,
          size: 'sm',
          class: 'pe-8'
        },
        {
          trailing: true,
          size: 'md',
          class: 'pe-9'
        },
        {
          trailing: true,
          size: 'lg',
          class: 'pe-10'
        },
        {
          trailing: true,
          size: 'xl',
          class: 'pe-11'
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: 'animate-spin'
          }
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: 'animate-spin'
          }
        }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'outline'
      }
    },
    radioGroup: {
      slots: {
        root: 'inline-flex flex-col gap-2 w-full',
        fieldset: 'flex flex-col gap-2',
        item: 'flex items-center cursor-pointer',
        container: 'flex items-center',
        base: 'rounded-full ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2',
        indicator: 'flex items-center justify-center size-4 after:bg-default after:rounded-full',
        wrapper: 'w-full flex items-center gap-2',
        label: 'ms-2 select-none  text-[inherit] font-semibold',
        description: 'block text-white text-[12px] ms-2 mt-1'
      },
      variants: {
        color: {
          primary: {
            base: 'focus-visible:outline-[var(--main-red)]',
            indicator: 'bg-[var(--main-red)]'
          },
          neutral: {
            base: 'focus-visible:outline-inverted',
            indicator: 'bg-inverted'
          }
        },
        variant: {
          list: {
            item: ''
          },
          card: {
            item: 'border border-muted rounded-[4px] mb-1'
          },
          table: {
            item: 'border border-muted'
          }
        },

        indicator: {
          start: {
            item: 'flex-row',
            wrapper: 'ms-3'
          },
          end: {
            item: 'flex-row-reverse',
            wrapper: 'me-3'
          }
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-[var(--main-red)] has-data-[state=checked]:bg-[var(--main-slider-black)]'
          }
        }
      ],

      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'list',
        orientation: 'vertical',
        indicator: 'start'
      }
    },
    checkboxGroup: {
      slots: {
        root: 'inline-flex flex-col gap-2 w-full',
        fieldset: 'flex flex-col gap-2',
        item: 'flex items-center cursor-pointer',
        container: 'flex items-center',
        base: 'rounded-full ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2',
        indicator: 'flex items-center justify-center size-4 after:bg-default after:rounded-full',
        wrapper: 'w-full flex items-center gap-2',
        label: 'ms-2 select-none  text-[inherit] font-semibold',
        description: 'block text-white text-[12px] ms-2 mt-1'
      },
      variants: {
        color: {
          primary: {
            base: 'focus-visible:outline-[var(--main-red)]',
            indicator: 'bg-[var(--main-red)]'
          },
          neutral: {
            base: 'focus-visible:outline-inverted',
            indicator: 'bg-inverted'
          }
        },
        variant: {
          list: {
            item: ''
          },
          card: {
            item: 'border border-muted rounded-[4px] mb-1'
          },
          table: {
            item: 'border border-muted'
          }
        },

        indicator: {
          start: {
            item: 'flex-row',
            wrapper: 'ms-3'
          },
          end: {
            item: 'flex-row-reverse',
            wrapper: 'me-3'
          }
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'card',
          class: {
            item: 'has-data-[state=checked]:border-[var(--main-red)] has-data-[state=checked]:bg-[var(--main-slider-black)]'
          }
        }
      ],

      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'list',
        orientation: 'vertical',
        indicator: 'start'
      }
    },
    inputDate: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-[42px] border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'absolute inset-y-0 end-0 flex items-center',
        trailingIcon: 'shrink-0 text-dimmed'
      },
    },
    calendar: {
      slots: {
        root: '',
        header: 'flex items-center justify-between',
        body: 'flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0',
        heading: 'text-center font-medium truncate mx-auto',
        grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
        gridRow: 'grid grid-cols-7 place-items-center',
        gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
        gridBody: 'grid',
        headCell: 'rounded-md',
        cell: 'relative text-center',
        cellTrigger: [
          'm-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-disabled:text-muted data-unavailable:line-through data-unavailable:text-muted data-unavailable:pointer-events-none data-today:font-semibold data-[outside-view]:text-muted',
          'transition'
        ]
      },
      variants: {
        color: {
          primary: {
            headCell: 'text-white',
            cellTrigger: 'focus-visible:ring-red-600'
          },
        },
        variant: {
          solid: '',
          outline: '',
          soft: '',
          subtle: ''
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: {
            cellTrigger: 'data-[selected]:bg-red-600 data-[selected]:text-inverted data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-red-600/20'
          }
        }
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'solid'
      }
    },
    inputTime: {
      slots: {
        base: [
          'w-full rounded-[42px] border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'absolute inset-y-0 end-0 flex items-center',
        trailingIcon: 'shrink-0 text-dimmed',
        segment: [
          'rounded text-center outline-hidden data-placeholder:text-dimmed data-[segment=literal]:text-muted data-invalid:text-error data-disabled:cursor-not-allowed data-disabled:opacity-75',
          'transition-colors'
        ]
      }
    },
    checkbox: {
        slots: {
          root: 'relative flex items-start',
          container: 'flex items-center',
          base: [
            'rounded-sm ring ring-inset ring-accented overflow-hidden',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'data-[state=checked]:bg-[var(--main-red)]',
            'data-[state=checked]:ring-[var(--main-red)]',
          ].join(' '),
          indicator: [
            'flex items-center justify-center size-full text-white',
            'data-[state=checked]:text-white',
          ].join(' '),
          icon: 'shrink-0 size-full',
          wrapper: 'w-full',
          label: [
            'block font-medium text-white',
            'data-[state=checked]:text-[var(--main-red)]',
          ].join(' '),

          description: 'max-w-[300px] text-white text-[12px] mt-1'
        },
        variants: {
          color: {
            primary: {
              base: 'focus-visible:outline-[var(--main-red)]',
              indicator: 'bg-[var(--main-red)]'
            }
          }
        }
    },
    textarea: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-[32px] border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 !px-4.5',
          'transition-colors'
        ],
        leading: 'absolute start-0 flex items-start',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'absolute end-0 flex items-start',
        trailingIcon: 'shrink-0 text-dimmed'
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: ['outline', 'subtle'],
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--main-red)]'
        }
      ]
    },
    inputNumber: {
      slots: {
        root: 'relative inline-flex items-center !overflow-hidden',
        base: [
          'w-full max-w-[120px]  !rounded-[42px] rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],

      },
      compoundVariants: [
        {
          color: 'primary',
          variant: [
            'subtle'
          ],
          class: 'bg-white text-black focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--main-red)]'
        },
        {
          color: 'primary',
          variant: [
            'outline',
          ],
          class: [
            'bg-transparent text-white',
            'border-none !border-0',
            'outline-none !outline-0',
            'ring-0 !ring-0',
            'focus:border-none focus:!border-0',
            'focus:outline-none focus:!outline-0',
            'focus:ring-0 focus:!ring-0',
            'focus-visible:outline-none focus-visible:!outline-0',
            'focus-visible:ring-0 focus-visible:!ring-0'
          ].join(' ')
        },
      ]
    }
  }
})
